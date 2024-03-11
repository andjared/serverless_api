import { generatePolicy } from './generatePolicy.js';

export const generateResponse = (principalId, effect, resource) => {
	return {
		principalId,
		policyDocument: generatePolicy(effect, resource),
	};
};
