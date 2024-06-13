# ===================================
# Script for S3 bucket that will save terraform state
# ===================================

provider "aws" {
  region = "eu-west-3"
}

# Ressources ---------------------------------------------

data "aws_s3_bucket" "existing" {
  count  = var.backend_bucket == "tfstate-front-girlysheet" ? 1 : 0 
  bucket = var.backend_bucket
}

# -- S3 Bucket  
resource "aws_s3_bucket" "morningnews_tfstate_bucket" {
  count  = length(data.aws_s3_bucket.existing) > 0 ? 0 : 1
  bucket = var.backend_bucket
}

# -- S3 Bucket Public access rules

resource "aws_s3_bucket_ownership_controls" "private" {
  count  = length(aws_s3_bucket.morningnews_tfstate_bucket) > 0 ? 1 : 0
  bucket = aws_s3_bucket.morningnews_tfstate_bucket[0].id
  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}

resource "aws_s3_bucket_public_access_block" "private" {
  count  = length(aws_s3_bucket.morningnews_tfstate_bucket) > 0 ? 1 : 0
  bucket = aws_s3_bucket.morningnews_tfstate_bucket[0].id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_s3_bucket_acl" "private" {
  depends_on = [
    aws_s3_bucket_ownership_controls.private,
    aws_s3_bucket_public_access_block.private,
  ]

  count  = length(aws_s3_bucket.morningnews_tfstate_bucket) > 0 ? 1 : 0
  bucket = aws_s3_bucket.morningnews_tfstate_bucket[0].id
  acl    = "private"
}