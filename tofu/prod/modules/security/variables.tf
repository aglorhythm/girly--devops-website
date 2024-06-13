# ===================================
# Author: @aglorhythm / girlysheet.cloud ✿
# Description: Here we define our variables. They can be used dynamically !
# ===================================


# Environment
variable "environment" {
  description = "Environment of deployment"
  type        = string
  default     = "preprod"
}

# VPC ID where the security group will be created
variable "vpc_id" {
  type        = string
  description = "The ID of the VPC where the security group will be created."
  default     = "vpc-0ed36a10dfbbffe20"
}

# Security group
variable "sg" {
  type        = string
  description = "List of security groups."
  default     = "girlysheet_front_sg" # Focus on Paris & London 
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

# SSH acces
variable "ssh_port" {
  type        = string
  description = "Port for ssh"
}