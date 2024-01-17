import React from 'react';
import { render, fireEvent, render, waitFor } from '@testing-library/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AddComponent from '../sites/AddReflexionSite';

describe('AddComponent', () => {
    it('renders correctly', async () => {
        const { queryByText } = render(
          <SafeAreaProvider>
            <AddComponent />
          </SafeAreaProvider>
        );
      
        await waitFor(() => {
          expect(queryByText('Submit Reflection')).toBeTruthy();
        });
      });

  it('allows entering a title', () => {
    const { queryByLabelText } = render(
      <SafeAreaProvider>
        <AddComponent />
      </SafeAreaProvider>
    );
    const titleInput = queryByLabelText('Title');
    if (titleInput) {
      fireEvent.changeText(titleInput, 'Test Title');
      expect(titleInput.props.value).toBe('Test Title');
    } else {
      throw new Error('Title input not found');
    }
  });
});