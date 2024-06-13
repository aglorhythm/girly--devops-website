# Environment
variable "environment" {
  description = "Environment of deployment"
  type        = string
}

variable "ansible_folder" {
  description = "Ansible folder"
  type        = string
}

variable "cidr_block_rt" {
  description = "The CIDR block for the route table"
  type        = string
  default     = "0.0.0.0/0" 
}

variable "cidr_block" {
  description = "The CIDR block for the subnets"
  type        = string
  default     = "192.168.0.0/24" 
}

variable "cidr_block_vpc" {
  description = "The CIDR block for the subnets"
  type        = string
  default     = "192.168.0.0/24" 
}

# Availability Zones
variable "azs" {
  type        = list(string)
  description = "List of preferred availability zones in Paris region."
  default     = ["eu-west-3a"]
}

variable "vpc_id" {
  type        = string
  description = "ID of the VPC to use." 
  default     =  "vpc-00bed21fdbd01017f" 
}

# ---------- Security

# Security groups
variable "sg" {
  type        = string
  description = "List of security groups."
  default     = "girlysheet_front_sg"
}

# CIDR blocks to allow SSH access
variable "ssh_access_cidr" {
  type        = list(string)
  description = "CIDR blocks that is allowed SSH access to the instances."
  default     = ["0.0.0.0/0"]  
}

# CIDR blocks to allow HTTP access
variable "http_access_cidr" {
  type        = list(string)
  description = "CIDR blocks that is allowed for HTTP access to the instances."
  default     = ["0.0.0.0/0"]  
}

# CIDR blocks to allow HTTPS access
variable "https_access_cidr" {
  type        = list(string)
  description = "CIDR blocks that is allowed for HTTPS access to the instances."
  default     = ["0.0.0.0/0"]  
}

# DNS variables  ------- >

variable "ovh_application_key" {
  description = "OVH API application key"
  type        = string
}

variable "ovh_application_secret" {
  description = "OVH API application secret"
  type        = string
}

variable "ovh_consumer_key" {
  description = "OVH API consumer key"
  type        = string
}

variable "domain_name" {
  description = "The domain name to manage"
  type        = string
}

# Availability Zones
variable "email" {
  type        = string
  description = "Email for SSL installation"
}

# Access variables  ------- >

variable "access_key" {
  description = "AWS access key"
  type        = string
}

variable "secret_key" {
  description = "AWS secret key"
  type        = string
}

variable "ssh_port" {
  description = "Instance SSH port"
  type        = string
}

variable "region" {
  description = "AWS region"
  type        = string
  default     = "eu-west-3" 
}


# -----  Backend bucket
variable "backend_bucket" {
  description = "The name of the S3 bucket to be created"
  type        = string
  default     = "tfstate-front-girlysheet"
}