// See https://github.com/jeremenichelli/typeform-payload-helpers

// You can get these values by simulating a webhook request through the typeform interface
export const refsMap = {
  founder_or_no: 'lY0j8jKVjWG2',
  name: 'f1f16b3a-a7f7-47c5-8aa9-f5943bc702a3',
  founders: 'uKr1M7EgfX6g',
  linkedins: '950d5a8a-e8d5-4096-b8e2-d72413be54d0',
  schools: 'f57370cb-554c-4b58-95a2-9bf6a21a8730',
  website: 'b7e6e51c-00a5-4db7-af16-77dd97203250',
  description: '68d87edb-1512-47ce-b583-dd36951d10b3',
  industries: 'd5c9a49b-f18f-478a-9c50-92a09ad6f9fe',
  uniqueness: 'e86de8c7-5cbf-4886-baef-17076bb6cbff',
  pitchdeck: 'fae3560a-2fa1-4dfa-a18b-bca075cb32f3',
  fundraising_process: '18503a27-a1f1-45c1-90bf-3745880f40a0',
  pitch_style: 'd176af34-5ac7-4709-aa39-920d7b42e4cb',
  team: 'b5060505-70ff-4d7e-9090-a94ac0e5382f',
  email: '108f43bc-0e38-4a55-ba33-c065862b35a8',
  applied_to_drf: '5d4b5127-639b-4010-b499-5b725efcbb1e',
  referral: '0d01d6bd-24ad-4464-84c9-3715295f1e13',
  how_did_you_hear: 'a9378cb2-2c60-4db3-ad53-0a07dffd9289',
  gender_breakdown: '5f5e23f5-26cd-4475-84d8-f56c056c580b',
  race_or_ethnicity: '5658b90e-61c8-4f5c-bfd1-e9dd4f68e51e',
};

export const getAnswerValueFromRef = (payload, ref: string) => {
  const { id } = payload.definition.fields.find((field) => field.ref === ref);

  const answer = payload.answers.find(
    (possibleAnswer) => possibleAnswer.field.id === id
  );

  const { type } = answer;
  const value = answer[type];

  if (type === 'choices') return value.labels;

  if (type === 'choice') return value.label;

  return value;
};
