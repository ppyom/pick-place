import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { ImageUploader } from './image-uploader';

function createImageFile(name = 'photo.png') {
  return new File(['dummy'], name, { type: 'image/png' });
}

describe('ImageUploader', () => {
  it('파일을 선택하면 onChange에 해당 File이 전달된다', async () => {
    const handleChange = vi.fn();
    render(<ImageUploader onChange={handleChange} />);

    const input = screen.getByLabelText('이미지 선택').querySelector('input')!;
    const file = createImageFile();

    await userEvent.upload(input, file);

    expect(handleChange).toHaveBeenCalledWith(file);
  });

  it('파일 선택 후 미리보기 이미지가 갱신된다', async () => {
    const { container } = render(<ImageUploader onChange={vi.fn()} />);

    const input = screen.getByLabelText('이미지 선택').querySelector('input')!;
    await userEvent.upload(input, createImageFile());

    const img = container.querySelector('img');
    expect(img).toHaveAttribute('src', expect.stringContaining('blob:'));
  });

  it('value prop이 바뀌면 미리보기가 동기화된다', () => {
    const { container, rerender } = render(
      <ImageUploader value="https://example.com/a.png" onChange={vi.fn()} />,
    );

    expect(container.querySelector('img')).toHaveAttribute('src', 'https://example.com/a.png');

    rerender(<ImageUploader value="https://example.com/b.png" onChange={vi.fn()} />);
    expect(container.querySelector('img')).toHaveAttribute('src', 'https://example.com/b.png');
  });

  it('disabled일 때 클릭해도 파일 선택이 트리거되지 않는다', async () => {
    const handleChange = vi.fn();
    render(<ImageUploader disabled onChange={handleChange} />);

    const trigger = screen.getByLabelText('이미지 선택');
    const input = trigger.querySelector('input')!;
    const clickSpy = vi.spyOn(input, 'click');

    await userEvent.click(trigger);

    expect(clickSpy).not.toHaveBeenCalled();
    expect(trigger).toHaveAttribute('aria-disabled', 'true');
  });

  it('disabled일 때 Enter/Space로도 트리거되지 않는다', () => {
    render(<ImageUploader disabled onChange={vi.fn()} />);

    const trigger = screen.getByLabelText('이미지 선택');
    const input = trigger.querySelector('input')!;
    const clickSpy = vi.spyOn(input, 'click');

    fireEvent.keyDown(trigger, { key: 'Enter' });
    fireEvent.keyDown(trigger, { key: ' ' });

    expect(clickSpy).not.toHaveBeenCalled();
  });

  it('재선택 시 이전 objectURL을 정리한다', async () => {
    const revokeSpy = vi.spyOn(URL, 'revokeObjectURL').mockImplementation(() => {});
    render(<ImageUploader onChange={vi.fn()} />);

    const input = screen.getByLabelText('이미지 선택').querySelector('input')!;

    await userEvent.upload(input, createImageFile('first.png'));
    await userEvent.upload(input, createImageFile('second.png'));

    expect(revokeSpy).toHaveBeenCalledTimes(1);
    revokeSpy.mockRestore();
  });

  it('언마운트 시 objectURL을 정리한다', async () => {
    const revokeSpy = vi.spyOn(URL, 'revokeObjectURL').mockImplementation(() => {});
    const { unmount } = render(<ImageUploader onChange={vi.fn()} />);

    const input = screen.getByLabelText('이미지 선택').querySelector('input')!;
    await userEvent.upload(input, createImageFile());

    unmount();

    expect(revokeSpy).toHaveBeenCalledTimes(1);
    revokeSpy.mockRestore();
  });
});
