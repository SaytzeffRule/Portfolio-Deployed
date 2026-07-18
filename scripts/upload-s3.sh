#!/usr/bin/env bash
# =============================================================================
# Upload static assets to S3
# =============================================================================
# This script uploads the resume PDF and profile image to your S3 bucket and
# makes them publicly readable. After running, set the resulting URLs in
# your .env file as VITE_RESUME_URL and VITE_PROFILE_IMG_URL.
#
# Prerequisites:
#   1. Install the AWS CLI v2  (https://aws.amazon.com/cli/)
#   2. Configure credentials:  aws configure
#      (Use the access key and secret from the IAM deploy user.)
#   3. Create an S3 bucket (instructions in README).
#
# Usage:
#   chmod +x scripts/upload-s3.sh
#   ./scripts/upload-s3.sh <bucket-name> [region]
#
# Example:
#   ./scripts/upload-s3.sh my-portfolio-assets us-east-1
# =============================================================================

set -euo pipefail

BUCKET="${1:?Usage: $0 <bucket-name> [region]}"
REGION="${2:-us-east-1}"

echo "=== Uploading assets to s3://${BUCKET} ==="

aws s3 cp ./assets/resume.pdf "s3://${BUCKET}/resume.pdf" --region "${REGION}"
aws s3 cp ./assets/profile.jpg "s3://${BUCKET}/profile.jpg" --region "${REGION}"

echo "=== Setting public-read ACL ==="

aws s3api put-object-acl \
  --bucket "${BUCKET}" \
  --key resume.pdf \
  --acl public-read \
  --region "${REGION}"

aws s3api put-object-acl \
  --bucket "${BUCKET}" \
  --key profile.jpg \
  --acl public-read \
  --region "${REGION}"

echo ""
echo "=== Done! Your file URLs are: ==="
echo "Resume PDF:    https://${BUCKET}.s3.${REGION}.amazonaws.com/resume.pdf"
echo "Profile Photo: https://${BUCKET}.s3.${REGION}.amazonaws.com/profile.jpg"
echo ""
echo "Set these as VITE_RESUME_URL and VITE_PROFILE_IMG_URL in your .env file."
