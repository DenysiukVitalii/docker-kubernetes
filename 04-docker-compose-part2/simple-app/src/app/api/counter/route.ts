import { promises as fs } from 'fs';
import path from 'path';

const DATA_DIR = '/app/data';
const COUNTER_FILE = path.join(DATA_DIR, 'counter.json');

type CounterData = {
  visits: number;
};

async function ensureDataFile() {
  await fs.mkdir(DATA_DIR, { recursive: true });

  try {
    await fs.access(COUNTER_FILE);
  } catch {
    const initialData: CounterData = { visits: 0 };
    await fs.writeFile(
      COUNTER_FILE,
      JSON.stringify(initialData, null, 2),
      'utf-8'
    );
  }
}

async function readCounter(): Promise<CounterData> {
  await ensureDataFile();

  const raw = await fs.readFile(COUNTER_FILE, 'utf-8');
  return JSON.parse(raw) as CounterData;
}

async function writeCounter(data: CounterData) {
  await fs.writeFile(COUNTER_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

export async function GET() {
  try {
    const current = await readCounter();
    const nextValue = current.visits + 1;

    await writeCounter({ visits: nextValue });

    return Response.json({
      ok: true,
      visits: nextValue
    });
  } catch (error) {
    console.error('Counter read/write error:', error);

    return Response.json(
      {
        ok: false,
        message: 'Failed to update counter'
      },
      { status: 500 }
    );
  }
}
