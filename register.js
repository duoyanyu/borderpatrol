async function setup() {
  await faceapi.nets.tinyFaceDetector.loadFromUri('https://cdn.jsdelivr.net/npm/face-api.js/models');
  await faceapi.nets.faceRecognitionNet.loadFromUri('https://cdn.jsdelivr.net/npm/face-api.js/models');
  await faceapi.nets.faceLandmark68Net.loadFromUri('https://cdn.jsdelivr.net/npm/face-api.js/models');

  const video = document.getElementById('video');
  navigator.mediaDevices.getUserMedia({ video: {} })
    .then(stream => video.srcObject = stream);

  document.getElementById('registerBtn').addEventListener('click', async () => {
    const detections = await faceapi.detectSingleFace(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptor();
    if (!detections) return alert('No face detected');

    const newUser = {
      name: document.getElementById('name').value,
      birthday: document.getElementById('birthday').value,
      descriptor: Array.from(detections.descriptor)
    };

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    alert('User registered');
  });
}
setup();
