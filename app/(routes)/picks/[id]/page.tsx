import { PickDetailContent } from './pick-detail-content';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function PickDetailPage({ params }: Props) {
  const { id } = await params;

  return <PickDetailContent id={id} />;
}
