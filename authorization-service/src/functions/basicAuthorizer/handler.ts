import { middyfy } from '@libs/lambda';
import { AuthResponse , PolicyDocument } from 'aws-lambda'
import { APIGatewayTokenAuthorizerEvent } from 'aws-lambda/trigger/api-gateway-authorizer';

const basicAuthorizer = async (event: APIGatewayTokenAuthorizerEvent ): Promise<AuthResponse> => {
  console.log('basicAuthorizer::event', JSON.stringify(event, null,2));

  if (event.type !== 'TOKEN') {
    throw new Error('Unauthorized');
  }

  const { authorizationToken, methodArn } = event;
  const token = getToken(authorizationToken);
  const policyDocument = generatePolicy(isValidToken(token) ? 'Allow' : 'Deny', methodArn);

  return {
    principalId: token,
    policyDocument,
  };
};

const getToken = (authHeader: string): string => {
  const [, credentials = ''] = authHeader.split(' ');
  return Buffer.from(credentials, 'base64').toString('utf-8');
};

const isValidToken = (token: string): boolean => {
  const [userName, password] = token.split('::');
  const isNameMatches = process.env.USER_NAME && userName === process.env.USER_NAME;
  const isPasswordMatches = process.env.USER_PASSWORD && password === process.env.USER_PASSWORD;

  return isNameMatches && isPasswordMatches;
};

const generatePolicy = (effect: string, resource: string): PolicyDocument => {
  return {
    Version: '2012-10-17',
    Statement: [
      {
        Action: 'execute-api:Invoke',
        Effect: effect,
        Resource: resource,
      },
    ],
  };
};

export const main = middyfy(basicAuthorizer);
