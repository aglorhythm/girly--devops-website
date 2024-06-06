# ===================================
# Author: @aglorhythm / girlysheet.cloud ✿
# Description: This module will handle VPC creation, subnets, and internet gateway setup.
# ===================================


# ✿ AMI - latest version for debian 12 (currently not used)
data "aws_ami" "debian_12" {
  most_recent = true
  owners      = ["136693071363"]

  filter {
    name   = "name"
    values = ["debian-12-amd64-20240507-1740"]
  }
}

# ✿ VPC -  Create GS's private VPC
resource "aws_vpc" "girlysheet_vpc" {
  cidr_block = var.cidr_block
  enable_dns_hostnames = true
  enable_dns_support = true
  tags = {
    Name = "girlysheet-vpc"
  }
}

# ✿ Gateway - Create gateway and rattach to vpc
resource "aws_internet_gateway" "girlysheet_gw" {
  vpc_id = aws_vpc.girlysheet_vpc.id

  tags = {
    Name = "girlysheet-gateway"
  }
}

# ✿ Subnet - Create a public subnet and rattach to vpc
resource "aws_subnet" "public_subnets" {
  count             = length(var.azs) 
  vpc_id            = aws_vpc.girlysheet_vpc.id
  cidr_block        = cidrsubnet(var.cidr_block, 8, count.index)
  availability_zone = var.azs[count.index] 
  map_public_ip_on_launch = true
  tags = {
    Name = "public-subnet-${var.azs[count.index]}" 
  }
}

# ✿ Route - Create a route table and rattach to gateway + vpc
resource "aws_route_table" "public_subnets_route" {
  vpc_id = aws_vpc.girlysheet_vpc.id

  route {
    cidr_block = var.cidr_block_public
    gateway_id = aws_internet_gateway.girlysheet_gw.id
  }

  tags = {
    Name = "public_subnet_route"
  }
}

# ✿ Associate a route to public subnets
resource "aws_route_table_association" "public_subnet_route_association" {
  count          = length(aws_subnet.public_subnets)
  subnet_id      = aws_subnet.public_subnets[count.index].id
  route_table_id = aws_route_table.public_subnets_route.id
}