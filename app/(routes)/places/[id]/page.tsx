import { PlaceDetailContent } from './place-detail-content';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function PlaceDetailPage({ params }: Props) {
  const { id } = await params;

  return <PlaceDetailContent id={id} />;
}
