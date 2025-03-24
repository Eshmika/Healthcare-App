import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { collection, getDocs } from '@firebase/firestore';
import DoctorHomeScreen from './DoctorHomeScreen'; 
import { db } from '../firebaseConfig';

// Mock the Firestore getDocs function
jest.mock('@firebase/firestore', () => ({
  collection: jest.fn(),
  getDocs: jest.fn(),
}));

describe('DoctorHomeScreen', () => {
  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    getDocs.mockClear();
  });

  it('renders correctly and shows loading state', async () => {
    getDocs.mockResolvedValueOnce({
      docs: []
    });

    const { getByText } = render(<DoctorHomeScreen navigation={{ navigate: jest.fn() }} />);
    
    // Verify loading state is shown
    expect(getByText('Loading doctors...')).toBeTruthy();
  });

  it('fetches and displays doctor data', async () => {
    const mockDoctors = [
      {
        id: '1',
        doctor_name: 'Dr. Smith',
        doctor_type: 'Cardiologist',
        hospital: 'City Hospital',
        availability: 'Available',
        imageUrl: 'https://example.com/image1.jpg',
      },
      {
        id: '2',
        doctor_name: 'Dr. Doe',
        doctor_type: 'Dermatologist',
        hospital: 'County Hospital',
        availability: 'Not Available',
        imageUrl: 'https://example.com/image2.jpg',
      },
    ];

    getDocs.mockResolvedValueOnce({
      docs: mockDoctors.map((doc) => ({ id: doc.id, data: () => doc })),
    });

    const { getByText } = render(<DoctorHomeScreen navigation={{ navigate: jest.fn() }} />);
    
    // Wait for loading to finish
    await waitFor(() => expect(getByText('Dr. Smith')).toBeTruthy());
    await waitFor(() => expect(getByText('Dr. Doe')).toBeTruthy());
  });

  it('filters doctors based on search input', async () => {
    const mockDoctors = [
      {
        id: '1',
        doctor_name: 'Dr. Smith',
        doctor_type: 'Cardiologist',
        hospital: 'City Hospital',
        availability: 'Available',
        imageUrl: 'https://example.com/image1.jpg',
      },
      {
        id: '2',
        doctor_name: 'Dr. Doe',
        doctor_type: 'Dermatologist',
        hospital: 'County Hospital',
        availability: 'Not Available',
        imageUrl: 'https://example.com/image2.jpg',
      },
    ];

    getDocs.mockResolvedValueOnce({
      docs: mockDoctors.map((doc) => ({ id: doc.id, data: () => doc })),
    });

    const { getByPlaceholderText, getByText, queryByText } = render(<DoctorHomeScreen navigation={{ navigate: jest.fn() }} />);
    
    // Wait for loading to finish
    await waitFor(() => expect(getByText('Dr. Smith')).toBeTruthy());

    // Filter the doctors
    const searchInput = getByPlaceholderText('Search....');
    fireEvent.changeText(searchInput, 'Doe');

    // Verify that only Dr. Doe is visible after filtering
    expect(getByText('Dr. Doe')).toBeTruthy();
    expect(queryByText('Dr. Smith')).toBeNull(); // Dr. Smith should not be visible
  });

  it('navigates to Book Appointment screen when Book Now button is pressed', async () => {
    const mockDoctors = [
      {
        id: '1',
        doctor_name: 'Dr. Smith',
        doctor_type: 'Cardiologist',
        hospital: 'City Hospital',
        availability: 'Available',
        imageUrl: 'https://example.com/image1.jpg',
      },
    ];

    getDocs.mockResolvedValueOnce({
      docs: mockDoctors.map((doc) => ({ id: doc.id, data: () => doc })),
    });

    const navigate = jest.fn();
    const { getByText } = render(<DoctorHomeScreen navigation={{ navigate }} />);
    
    // Wait for loading to finish
    await waitFor(() => expect(getByText('Dr. Smith')).toBeTruthy());

    // Press the Book Now button
    fireEvent.press(getByText('Book Now'));

    // Verify navigation was called with correct parameters
    expect(navigate).toHaveBeenCalledWith('Book Appointment', { doctorId: '1' });
  });
});
