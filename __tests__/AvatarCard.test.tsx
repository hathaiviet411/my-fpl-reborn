import { render, waitFor } from '@testing-library/react-native';

import { AvatarCard } from '@/src/components/ui/AvatarCard';
import { StorageFactory } from '@/src/core/storage/StorageFactory';

describe('AvatarCard', () => {
  beforeEach(() => {
    StorageFactory.resetForTests();
  });

  it('renders student name and email', async () => {
    const { getByText } = await render(
      <AvatarCard
        studentEmail="nguyenvana@fpt.edu.vn"
        studentName="Nguyen Van A"
      />,
    );

    await waitFor(() => {
      expect(getByText('Nguyen Van A')).toBeOnTheScreen();
      expect(getByText('nguyenvana@fpt.edu.vn')).toBeOnTheScreen();
    });
  });

  it('renders remote avatar when avatarImage is provided', async () => {
    const { getByLabelText } = await render(
      <AvatarCard
        avatarImage="https://example.com/avatar.png"
        studentEmail="student@fpt.edu.vn"
        studentName="Student"
      />,
    );

    await waitFor(() => {
      expect(getByLabelText('Student avatar')).toBeOnTheScreen();
    });
  });
});
