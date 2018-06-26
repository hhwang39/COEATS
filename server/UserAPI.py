import boto3
from botocore.exceptions import ClientError
from awscredentials import AWS_SECRET, AWS_KEY, REGION
from decimal import Decimal
dynamodb = boto3.resource('dynamodb', aws_access_key_id=AWS_KEY,
                          aws_secret_access_key=AWS_SECRET,
                          region_name=REGION)
table = dynamodb.Table("User")

def subtractAmount(userId, amount):
    try:
        response = table.update_item(
            Key={
                'userId': userId,
            },
            UpdateExpression="set credits = credits - :val",
            ExpressionAttributeValues={
                ':val': amount
            },
            ReturnValues="UPDATED_NEW"
        )
    except ClientError as e:
        print(e.response['Error']['Message'])
        # print(json.dumps(item, indent=4, cls=DecimalEncoder))
        # pw_hash = str(item["password"]).decode("utf-8")
        # pw_hash = item["password"]
        # print(pw_hash)


def user_info(userId):
    try:
        response = table.get_item(
            Key={
                'userId': userId,
            },
            AttributesToGet=[
                "credits"
            ]
        )
    except ClientError as e:
        print(e.response['Error']['Message'])
        # print(json.dumps(item, indent=4, cls=DecimalEncoder))
        # pw_hash = str(item["password"]).decode("utf-8")
        # pw_hash = item["password"]
        # print(pw_hash)
    finally:
        if "Item" in response:
            item = response["Item"]
            return {"username": userId, "credits": item["credits"]}
    return None


print(user_info("ppp"))