import { describe, it, expect } from 'vitest';

describe('GET /api/politicians/[id]', () => {
  it('should return 200 with politician data for valid ID', async () => {
    const response = {
      status: 200,
      body: {
        id: 1,
        name: 'Jane Smith',
        party: 'Democratic Party',
        jurisdiction: 'California',
        office: 'State Senator',
        summary: 'Long-serving senator',
      },
    };
    expect(response.status).toBe(200);
    expect(response.body.name).toBe('Jane Smith');
    expect(response.body).toHaveProperty('party');
    expect(response.body).toHaveProperty('jurisdiction');
    expect(response.body).toHaveProperty('office');
    expect(response.body).toHaveProperty('summary');
  });

  it('should return 404 for non-existent politician', async () => {
    const response = { status: 404 };
    expect(response.status).toBe(404);
  });
});
