export default {
  type: "object",
  properties: {
    title: { type: 'string' },
    description: { type: 'string' },
    imageUrl: { type: 'string' },
    price: { type: 'number' },
    count: { type: 'number' },
  },
  required: [
    'title',
    'description',
    'imageUrl',
    'price',
    'count'
  ]
} as const;
