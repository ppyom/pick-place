import { PickEditContent } from './pick-edit-content';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function PickEditPage({ params }: Props) {
  const { id } = await params;

  return <PickEditContent id={id} />;
}
