# Infrastructure deployment 🌸

## 🪣 Run the script to configure the bucket

The bucket has to be created through the console first !

```bash
cd tofu/scripts
tofu init
tofu plan
tofu apply
```

## 🪵✨ Run the script to create the resources

```bash
cd tofu/
tofu init
tofu plan
tofu apply
```

## 🗝️ Retrieved the key to connect to the instance

We get the key from AWS and we store it in our local sever:

```bash
aws secretsmanager get-secret-value --secret-id example --region eu-east-1 --query SecretString --output text > example.pem
```

We restrict the rights to the retrieved key file:

```bash
chmod 400 "example.pem"
```

⭕ You need to delete you secret ?

Mistakes happen ! Just use AWS cli and you'll be set. 💅

```bash
aws secretsmanager delete-secret \
    --secret-id example \
    --force-delete-without-recovery \
    --region eu-east-1
```