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

variable "instance_details" {
  description = "A list of maps containing details for each instance to be created."
  type = list(object({
    name       : string
    type       : string
    subnet_id  : string
    ami        : string
    key_name   : string
  }))
  default = [
    {
      name      = "girlysheet_instance"
      type      = "t3a.small"
      subnet_id = "subnet-0f0fe6d1c6b275beb"  
      ami       = "ami-0ffe9ce6174b8d6c2"         
      key_name  = "girlysheet_front_key_pair"
    }
  ]
}

variable "security_group_ids" {
  description = "List of security group IDs to attach to each instance."
  type        = list(string) 
  default     = ["sg-084d120ddefefdd83"]
}