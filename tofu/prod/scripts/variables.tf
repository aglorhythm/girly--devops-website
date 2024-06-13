variable "backend_bucket" {
  description = "The name of the S3 bucket to be created"
  type        = string
  default = "tfstate-front-girlysheet-prod"
}

# AWS Access variables  ------- >

variable "access_key" {
  description = "AWS access key"
  type        = string
}

variable "secret_key" {
  description = "AWS secret key"
  type        = string
}

variable "region" {
  description = "AWS region"
  type        = string
  default     = "eu-north-1" 
}