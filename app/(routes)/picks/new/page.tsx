import { PickCreateContent } from './pick-create-content';

interface Props {
  searchParams: Promise<{ placeId?: string }>;
}

export default async function PickCreatePage({ searchParams }: Props) {
  const { placeId } = await searchParams;

  return <PickCreateContent placeId={placeId} />;
}
