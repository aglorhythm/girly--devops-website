# ===================================
# Author: @aglorhythm / jenkins.cloud ✿
# Description: This module will handle security groups and their rules.
# ===================================


# ✿ Create group "girlysheet_front_sg"
resource "aws_security_group" "girlysheet_front_sg" {
  name        = "${var.sg}_${var.environment}"
  description = "Security group for girlysheet"
  vpc_id      = var.vpc_id

  tags = {
    Name = "sg-${var.sg}-${var.environment}"
  }
}

# ✿ Add Inbound ssh rule to group girlysheet_front_sg
resource "aws_vpc_security_group_ingress_rule" "allow_ssh" {
  count             = length(var.ssh_access_cidr)
  security_group_id = aws_security_group.girlysheet_front_sg.id
  cidr_ipv4         = var.ssh_access_cidr[count.index]
  ip_protocol       = "tcp"
  from_port         = var.ssh_port
  to_port           = var.ssh_port
}

# ✿ Add Inbound to access app - rule to group girlysheet_front_sg
resource "aws_vpc_security_group_ingress_rule" "allow_inbound_nextjs" {
  count             = length(var.http_access_cidr)
  security_group_id = aws_security_group.girlysheet_front_sg.id
  cidr_ipv4         = var.http_access_cidr[count.index]
  ip_protocol       = "tcp"
  from_port         = 3000
  to_port           = 3000
}

# ✿ Add Inbound for http - rule to group girlysheet_front_sg
resource "aws_vpc_security_group_ingress_rule" "allow_inbound_http" {
  count             = length(var.http_access_cidr)
  security_group_id = aws_security_group.girlysheet_front_sg.id
  cidr_ipv4         = var.http_access_cidr[count.index]
  ip_protocol       = "tcp"
  from_port         = 80
  to_port           = 80
}

# ✿ Add Inbound for https - rule to group girlysheet_front_sg
resource "aws_vpc_security_group_ingress_rule" "allow_inbound_https" {
  count             = length(var.https_access_cidr)
  security_group_id = aws_security_group.girlysheet_front_sg.id
  cidr_ipv4         = var.https_access_cidr[count.index]
  ip_protocol       = "tcp"
  from_port         = 443
  to_port           = 443
}

# ✿ Add Outbound for everywhere - rule to "girlysheet_front_sg"
resource "aws_vpc_security_group_egress_rule" "allow_all_outbound" {
  count             = length(var.ssh_access_cidr)
  security_group_id = aws_security_group.girlysheet_front_sg.id
  cidr_ipv4         = var.ssh_access_cidr[count.index]
  ip_protocol       = "-1" 
}

# ---- SSH Keys -- >

# ✿ Create an RSA key
resource "tls_private_key" "gs_privkey" {
  algorithm = "RSA"
  rsa_bits  = 4096
}

# ✿ Key pair - Create an AWS Key Pair
resource "aws_key_pair" "gs_front_keypair" {
  key_name   = "girlysheet_front_key_pair_${var.environment}"
  public_key = tls_private_key.gs_privkey.public_key_openssh
}

# ✿ Secret storage - Create a secret manager resource to store private key
resource "aws_secretsmanager_secret" "gs_secret_front" {
  name = "girlysheet_front_privkey_${var.environment}"
  recovery_window_in_days = 0 # imediate deletion

  lifecycle {
    ##prevent_destroy = true
    #create_before_destroy = true  # Ensure to destroy before creating a new key
  }
}

# ✿ Private key - Stores the key in AWS Secrets Manager so it is secure
resource "aws_secretsmanager_secret_version" "gs_privkey" {
  secret_id     = aws_secretsmanager_secret.gs_secret_front.id
  secret_string = tls_private_key.gs_privkey.private_key_pem
}