# ===================================
# Author: @aglorhythm / girlysheet.cloud ✿
# Description: This script will handle the 
# creation of all things described inside our modules.
# ===================================

terraform {
  required_providers {

    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.51.0"
    }

    azurerm = {
      source  = "hashicorp/azurerm"
      version = "=3.0.0"
    }

    ovh = {
      source  = "ovh/ovh"
    }
  }

  backend "s3" {
    bucket                  = "tfstate-front-girlysheet"
    key                     = "state/terraform.tfstate"
    region                  = "eu-west-3"
  }
}

# ===================================
# ✿ Providers configurations
# ===================================

provider "aws" {
  region  = "eu-west-3"
}

provider "ovh" {
  endpoint            = "ovh-eu"
  application_key     = var.ovh_application_key
  application_secret  = var.ovh_application_secret
  consumer_key        = var.ovh_consumer_key
}

# ===================================
# ✿ VPC creation
# ===================================

module "vpc" {
  source     = "./modules/network"
  azs        = var.azs
  cidr_block = var.cidr_block_vpc
}


# ===================================
# ✿ Security layers
# ===================================

module "security" {
  source   = "./modules/security"
  vpc_id   = module.vpc.vpc_id
  ssh_port = var.ssh_port
  //ssh_access_cidr = "0.0.0.0/0"
}


# ===================================
# ✿ EC2 instance creation
# ===================================

# Fetch the latest Debian AMI
data "aws_ami" "debian_12" {
  most_recent = true
  owners      = ["136693071363"]

  filter {
    name   = "name"
    values = ["debian-12-amd64-20240507-1740"]
  }
}

module "ec2" {
  source            = "./modules/ec2"
  security_group_ids = [module.security.security_group_id[0]] 
  instance_details  = [
    {
      name                = "girlysheet_vm"
      type                = "t3a.small"
      subnet_id           = module.vpc.public_subnet_ids[0]
      ami                 = data.aws_ami.debian_12.id  
      key_name            = module.security.instance_key_name 
    }
  ]
}


# ===================================
# ✿ DNS
# ===================================

resource "ovh_domain_zone_record" "sub_girlysheet" {
  zone       = var.domain_name
  fieldtype  = "A"
  ttl        = 3600
  target     = module.ec2.instance_girlysheet_ip
}

# ===================================
# Ansible variables
# ===================================

# Generate Ansible variables file in the group_vars folder
resource "local_file" "girlysheet_vars" {
  filename = "../ansible/resources/group_vars/girlysheet.yml"
  content = <<-EOF
    ansible_user: admin
    ansible_ssh_private_key_file:  ./${module.security.instance_key}
    ansible_port: ${var.ssh_port}
    public_ip: "${module.ec2.instance_girlysheet_ip}"
    instance_dns_zone : ${ovh_domain_zone_record.sub_girlysheet.zone}
    certbot_email: ${var.email}
    hostname: girlysheet
  EOF
}

# Generate Ansible hosts file
resource "local_file" "hosts" {
  content = <<-EOF
  [girlysheet]
  ${module.ec2.instance_girlysheet_ip}
  EOF
  filename = "../ansible/resources/hosts"
}