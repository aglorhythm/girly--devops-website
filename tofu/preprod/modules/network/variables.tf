# ===================================
# Author: @aglorhythm / girlysheet.cloud ✿
# Description: Here we define our variables.
# ===================================


# Environment
variable "environment" {
  description = "Environment of deployment"
  type        = string
}

# The CIDR block for the VPC
variable "cidr_block" {
  description = "The CIDR block for the subnets"
  type        = string
  default     = "192.168.0.0/16"
}

variable "cidr_block_public" {
  description = "Public CIDR"
  type        = string
  default     = "0.0.0.0/0"
}


# Availability Zones
variable "azs" {
  type        = list(string)
  description = "List of preferred availability zones in Paris region."
  default     = ["eu-west-3a"]
}