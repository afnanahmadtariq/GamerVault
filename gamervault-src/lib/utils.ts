import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const randomImageUrls = [
  "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dmlkZW8lMjBnYW1lc3xlbnwwfHwwfHx8MA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1677870728110-3b3b41677a9b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dmlkZW8lMjBnYW1lc3xlbnwwfHwwfHx8MA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1664910795422-527440cfce2d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8dmlkZW8lMjBnYW1lc3xlbnwwfHwwfHx8MA%3D%3D",
  "https://images.unsplash.com/photo-1507457379470-08b800bebc67?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dmlkZW8lMjBnYW1lc3xlbnwwfHwwfHx8MA%3D%3D",
  "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8dmlkZW8lMjBnYW1lc3xlbnwwfHwwfHx8MA%3D%3D",
  "https://images.unsplash.com/photo-1593118247619-e2d6f056869e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHZpZGVvJTIwZ2FtZXN8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1551103782-8ab07afd45c1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHZpZGVvJTIwZ2FtZXN8ZW58MHx8MHx8fDA%3D",
  "https://media.istockphoto.com/id/1170073824/photo/gamer-work-space-concept-top-view-a-gaming-gear-mouse-keyboard-joystick-headset-mobile.webp?a=1&b=1&s=612x612&w=0&k=20&c=53gDtTY0dQg1KzyWiq1b4B6YJBB6ZNHcxxQTLtXTuCw=",
  "https://media.istockphoto.com/id/1367785899/photo/excited-young-asian-woman-playing-an-online-game-on-a-smartphone-with-fists-clenched.webp?a=1&b=1&s=612x612&w=0&k=20&c=mWDguHg250jNXhIH3B7BqibJEnvY7Y1BJyvrP5q1-vc=",
  "https://media.istockphoto.com/id/2158051126/photo/car-racing-video-game-at-an-arcade.webp?a=1&b=1&s=612x612&w=0&k=20&c=JUSk0q2O1j44F-xFidJfDhBvrLaC_L3NrpVr8bkCEp8=",
  "https://media.istockphoto.com/id/1405987908/photo/metaverse-cyberpunk-style-city-with-robots-walking-on-street-neon-lighting-on-building.webp?a=1&b=1&s=612x612&w=0&k=20&c=kfUuSmeOMPqzmNPz-0d_uaYxYlJsgeuguslUMo8Ggck=",
];

export function getRandomImageUrl(): string {
  return randomImageUrls[Math.floor(Math.random() * randomImageUrls.length)];
}
