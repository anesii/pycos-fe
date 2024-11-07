'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Modal from 'react-modal';

const exerciseData = [
  {
    type: 'Low-Intensity Workouts',
    videos: [
      { title: 'Gentle Yoga', url: 'https://www.youtube.com/watch?v=example1' },
      { title: 'Walking for Beginners', url: 'https://www.youtube.com/watch?v=example2' },
      // Add more videos as needed
    ],
  },
  {
    type: 'Strength Training',
    videos: [
      { title: 'Bodyweight Exercises', url: 'https://www.youtube.com/watch?v=example3' },
      { title: 'Resistance Band Workout', url: 'https://www.youtube.com/watch?v=example4' },
      // Add more videos as needed
    ],
  },
  // Add more exercise types as needed
];


export default function ExercisesPage() {
  const [hasPlan, setHasPlan] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentVideoUrl, setCurrentVideoUrl] = useState('');
  const router = useRouter();

  useEffect(() => {
    const storedMealPlan = localStorage.getItem('mealPlan');
    if (storedMealPlan) {
      setHasPlan(true);
    }
  }, []);

  const handleGeneratePlan = () => {
    router.push('/assessment'); // Redirect to the Symptom Assessment page
  };

  const openModal = (url: string) => {
    setCurrentVideoUrl(url);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setCurrentVideoUrl('');
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Exercises</h1>

      {!hasPlan ? (
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <h2 className="text-xl font-semibold mb-4">No Health Plan Generated</h2>
          <p className="mb-4">You need to generate a health plan first.</p>
          <button
            onClick={handleGeneratePlan}
            className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition-colors"
          >
            Go to Symptom Assessment
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {exerciseData.map((exerciseType, index) => (
            <div key={index} className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">{exerciseType.type}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {exerciseType.videos.map((video, videoIndex) => (
                  <div key={videoIndex} className="flex flex-col items-center">
                    <button onClick={() => openModal(video.url)}>
                      <img
                        src={`https://img.youtube.com/vi/${video.url.split('v=')[1]}/0.jpg`} // Get thumbnail from YouTube
                        alt={video.title}
                        className="rounded-lg shadow-md cursor-pointer"
                      />
                    </button>
                    <p className="mt-2 text-center">{video.title}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
      {/* Modal for YouTube Video */}
      <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Video Modal"
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75"
            overlayClassName="fixed inset-0"
         >
            <div className="bg-white rounded-lg p-4 relative">
            <button onClick={closeModal} className="absolute top-2 right-2 text-gray-500">
                &times;
            </button>
            <iframe
                width="560"
                height="315"
                src={currentVideoUrl.replace('watch?v=', 'embed/')}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            ></iframe>
            </div>
      </Modal>
    </div>
  );
}