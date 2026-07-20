import React, { useEffect, useRef } from "react";
import { PhoneIcon, EnvelopeIcon, MapPinIcon } from "@heroicons/react/24/solid";
import { useForm, SubmitHandler } from "react-hook-form";
import { motion } from "framer-motion";
// @ts-ignore
import * as THREE from "three";
import gsap from "gsap";

type Inputs = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

// Texture generators
const createWoodTexture = () => {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext("2d")!;

  ctx.fillStyle = "#3a3a3a";
  ctx.fillRect(0, 0, 256, 256);

  for (let i = 0; i < 100; i++) {
    ctx.fillStyle = `rgba(0, 0, 0, ${Math.random() * 0.3})`;
    ctx.fillRect(Math.random() * 256, Math.random() * 256, Math.random() * 50, 256);
  }
  return canvas;
};

const ContactMe = () => {
  const { register, handleSubmit } = useForm<Inputs>();
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    renderer.setSize(
      containerRef.current.clientWidth,
      containerRef.current.clientHeight
    );
    renderer.setClearColor(0xd4a574, 1); // Warm orange background
    containerRef.current.appendChild(renderer.domElement);

    camera.position.z = 5;
    sceneRef.current = scene;

    // Enhanced Lighting
    const ambientLight = new THREE.AmbientLight(0xffd89b, 1.2); // Warm ambient
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffd89b, 1.5);
    directionalLight.position.set(8, 8, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    const fillLight = new THREE.DirectionalLight(0xffc107, 0.8);
    fillLight.position.set(-8, 4, -5);
    scene.add(fillLight);

    // Create desk components
    const deskGroup = new THREE.Group();

    // === DESK SURFACE ===
    const deskGeometry = new THREE.BoxGeometry(4.5, 0.15, 1.8);
    const deskMaterial = new THREE.MeshStandardMaterial({
      color: 0x2a2a2a,
      roughness: 0.6,
      metalness: 0.05,
      map: new THREE.CanvasTexture(createWoodTexture()),
    });
    const desk = new THREE.Mesh(deskGeometry, deskMaterial);
    desk.position.y = 0;
    desk.receiveShadow = true;
    desk.castShadow = true;
    deskGroup.add(desk);

    // Desk frame (modern minimalist)
    const frameGeometry = new THREE.BoxGeometry(0.08, 1.2, 0.08);
    const frameMaterial = new THREE.MeshStandardMaterial({
      color: 0x1a1a1a,
      roughness: 0.4,
      metalness: 0.7,
    });

    const frameLeft1 = new THREE.Mesh(frameGeometry, frameMaterial);
    frameLeft1.position.set(-1.9, -0.6, -0.8);
    deskGroup.add(frameLeft1);

    const frameLeft2 = new THREE.Mesh(frameGeometry, frameMaterial);
    frameLeft2.position.set(-1.9, -0.6, 0.8);
    deskGroup.add(frameLeft2);

    const frameRight1 = new THREE.Mesh(frameGeometry, frameMaterial);
    frameRight1.position.set(1.9, -0.6, -0.8);
    deskGroup.add(frameRight1);

    const frameRight2 = new THREE.Mesh(frameGeometry, frameMaterial);
    frameRight2.position.set(1.9, -0.6, 0.8);
    deskGroup.add(frameRight2);

    // === DUAL MONITORS ===
    // Left Monitor
    const monitorGeometry = new THREE.BoxGeometry(1.1, 0.68, 0.08);
    const monitorBezelMaterial = new THREE.MeshStandardMaterial({
      color: 0x1a1a1a,
      roughness: 0.3,
      metalness: 0.5,
    });
    const monitorLeft = new THREE.Mesh(monitorGeometry, monitorBezelMaterial);
    monitorLeft.position.set(-0.9, 1.1, 0);
    monitorLeft.castShadow = true;
    deskGroup.add(monitorLeft);

    const screenLeftGeometry = new THREE.BoxGeometry(1.0, 0.62, 0.01);
    const screenMaterial = new THREE.MeshStandardMaterial({
      color: 0x0d0d0d,
      emissive: 0x1a3a6b,
      emissiveIntensity: 0.7,
    });
    const screenLeft = new THREE.Mesh(screenLeftGeometry, screenMaterial);
    screenLeft.position.set(-0.9, 1.1, 0.06);
    deskGroup.add(screenLeft);

    // Monitor stand left
    const standLeftGeometry = new THREE.BoxGeometry(0.15, 0.35, 0.08);
    const standMaterial = new THREE.MeshStandardMaterial({
      color: 0x2d2d2d,
      roughness: 0.6,
    });
    const standLeft = new THREE.Mesh(standLeftGeometry, standMaterial);
    standLeft.position.set(-0.9, 0.4, 0);
    deskGroup.add(standLeft);

    // Right Monitor
    const monitorRight = new THREE.Mesh(monitorGeometry, monitorBezelMaterial);
    monitorRight.position.set(0.9, 1.1, 0);
    monitorRight.castShadow = true;
    deskGroup.add(monitorRight);

    const screenRight = new THREE.Mesh(screenLeftGeometry, screenMaterial);
    screenRight.position.set(0.9, 1.1, 0.06);
    deskGroup.add(screenRight);

    // Monitor stand right
    const standRight = new THREE.Mesh(standLeftGeometry, standMaterial);
    standRight.position.set(0.9, 0.4, 0);
    deskGroup.add(standRight);

    // === LAPTOP ===
    const laptopBodyGeometry = new THREE.BoxGeometry(0.6, 0.03, 0.35);
    const laptopMaterial = new THREE.MeshStandardMaterial({
      color: 0x2a2a2a,
      roughness: 0.3,
      metalness: 0.6,
    });
    const laptopBody = new THREE.Mesh(laptopBodyGeometry, laptopMaterial);
    laptopBody.position.set(-2.0, 0.15, 0);
    laptopBody.castShadow = true;
    deskGroup.add(laptopBody);

    const laptopScreenGeometry = new THREE.BoxGeometry(0.55, 0.32, 0.02);
    const laptopScreenMaterial = new THREE.MeshStandardMaterial({
      color: 0x000000,
      emissive: 0x1a3a6b,
      emissiveIntensity: 0.5,
    });
    const laptopScreen = new THREE.Mesh(laptopScreenGeometry, laptopScreenMaterial);
    laptopScreen.position.set(-2.0, 0.25, 0.05);
    laptopScreen.rotation.x = -0.3;
    deskGroup.add(laptopScreen);

    // === KEYBOARD ===
    const keyboardGeometry = new THREE.BoxGeometry(0.95, 0.06, 0.35);
    const keyboardMaterial = new THREE.MeshStandardMaterial({
      color: 0x1f1f1f,
      roughness: 0.8,
    });
    const keyboard = new THREE.Mesh(keyboardGeometry, keyboardMaterial);
    keyboard.position.set(0, 0.15, 0.6);
    keyboard.castShadow = true;
    deskGroup.add(keyboard);

    // === MOUSE ===
    const mouseGeometry = new THREE.BoxGeometry(0.12, 0.08, 0.18);
    const mouseMaterial = new THREE.MeshStandardMaterial({
      color: 0xff6b3d,
      roughness: 0.4,
      metalness: 0.3,
    });
    const mouse = new THREE.Mesh(mouseGeometry, mouseMaterial);
    mouse.position.set(0.7, 0.15, 0.65);
    mouse.castShadow = true;
    deskGroup.add(mouse);

    // === HEADPHONES ===
    const headphoneArcGeometry = new THREE.TorusGeometry(0.35, 0.04, 8, 16);
    const headphoneMaterial = new THREE.MeshStandardMaterial({
      color: 0x333333,
      roughness: 0.5,
      metalness: 0.6,
    });
    const headphoneArc = new THREE.Mesh(headphoneArcGeometry, headphoneMaterial);
    headphoneArc.position.set(1.8, 1.3, 0);
    headphoneArc.rotation.x = Math.PI / 2;
    deskGroup.add(headphoneArc);

    // === MONITOR LIGHT BAR ===
    const monitorLightGeometry = new THREE.BoxGeometry(1.2, 0.06, 0.06);
    const monitorLightMaterial = new THREE.MeshStandardMaterial({
      color: 0x2a2a2a,
      roughness: 0.4,
      metalness: 0.5,
    });
    const monitorLight = new THREE.Mesh(monitorLightGeometry, monitorLightMaterial);
    monitorLight.position.set(0, 1.5, -0.1);
    deskGroup.add(monitorLight);

    // === COFFEE CUP ===
    const cupGeometry = new THREE.CylinderGeometry(0.08, 0.1, 0.18, 16);
    const cupMaterial = new THREE.MeshStandardMaterial({
      color: 0xf5deb3,
      roughness: 0.3,
      metalness: 0.1,
    });
    const cup = new THREE.Mesh(cupGeometry, cupMaterial);
    cup.position.set(1.6, 0.2, 0.7);
    cup.castShadow = true;
    deskGroup.add(cup);

    // === SMALL PLANT ===
    const plantPotGeometry = new THREE.CylinderGeometry(0.1, 0.12, 0.15, 16);
    const plantPotMaterial = new THREE.MeshStandardMaterial({
      color: 0x8b6914,
      roughness: 0.7,
    });
    const plantPot = new THREE.Mesh(plantPotGeometry, plantPotMaterial);
    plantPot.position.set(-1.8, 0.2, 0.8);
    plantPot.castShadow = true;
    deskGroup.add(plantPot);

    const plantLeafGeometry = new THREE.SphereGeometry(0.18, 8, 8);
    const plantMaterial = new THREE.MeshStandardMaterial({
      color: 0x4a7c3b,
      roughness: 0.7,
    });
    const plantLeaf = new THREE.Mesh(plantLeafGeometry, plantMaterial);
    plantLeaf.position.set(-1.8, 0.45, 0.8);
    deskGroup.add(plantLeaf);

    // === DESK LAMP ===
    const lampPoleGeometry = new THREE.CylinderGeometry(0.025, 0.025, 0.8, 8);
    const lampMaterial = new THREE.MeshStandardMaterial({
      color: 0x2a2a2a,
      roughness: 0.4,
      metalness: 0.7,
    });
    const lampPole = new THREE.Mesh(lampPoleGeometry, lampMaterial);
    lampPole.position.set(1.8, 0.6, -0.7);
    deskGroup.add(lampPole);

    const lampHeadGeometry = new THREE.ConeGeometry(0.25, 0.3, 16);
    const lampHeadMaterial = new THREE.MeshStandardMaterial({
      color: 0xffd89b,
      emissive: 0xffa500,
      emissiveIntensity: 0.9,
    });
    const lampHead = new THREE.Mesh(lampHeadGeometry, lampHeadMaterial);
    lampHead.position.set(1.8, 1.2, -0.7);
    deskGroup.add(lampHead);

    // === OFFICE CHAIR ===
    const chairGroup = new THREE.Group();

    // Chair base (5-star wheel base)
    const baseGeometry = new THREE.CylinderGeometry(0.35, 0.35, 0.08, 8);
    const baseMaterial = new THREE.MeshStandardMaterial({
      color: 0x1a1a1a,
      roughness: 0.5,
      metalness: 0.7,
    });
    const chairBase = new THREE.Mesh(baseGeometry, baseMaterial);
    chairBase.position.set(0, -0.9, -1.2);
    chairGroup.add(chairBase);

    // Wheels (5 wheels)
    const wheelGeometry = new THREE.CylinderGeometry(0.12, 0.12, 0.08, 16);
    const wheelMaterial = new THREE.MeshStandardMaterial({
      color: 0x333333,
      roughness: 0.6,
      metalness: 0.4,
    });

    for (let i = 0; i < 5; i++) {
      const angle = (i / 5) * Math.PI * 2;
      const wheelX = Math.cos(angle) * 0.3;
      const wheelZ = Math.sin(angle) * 0.3;
      const wheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
      wheel.rotation.z = Math.PI / 2;
      wheel.position.set(wheelX, -0.85, wheelZ - 1.2);
      chairGroup.add(wheel);
    }

    // Gas cylinder (pneumatic support)
    const cylinderGeometry = new THREE.CylinderGeometry(0.04, 0.04, 0.5, 8);
    const cylinderMaterial = new THREE.MeshStandardMaterial({
      color: 0x2a2a2a,
      roughness: 0.4,
      metalness: 0.8,
    });
    const gasCylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
    gasCylinder.position.set(0, -0.35, -1.2);
    chairGroup.add(gasCylinder);

    // Chair seat
    const seatGeometry = new THREE.BoxGeometry(0.5, 0.12, 0.55);
    const seatMaterial = new THREE.MeshStandardMaterial({
      color: 0xff6b3d,
      roughness: 0.4,
      metalness: 0.1,
    });
    const seat = new THREE.Mesh(seatGeometry, seatMaterial);
    seat.position.set(0, -0.05, -1.2);
    seat.castShadow = true;
    chairGroup.add(seat);

    // Chair backrest
    const backrestGeometry = new THREE.BoxGeometry(0.5, 0.8, 0.12);
    const backrestMaterial = new THREE.MeshStandardMaterial({
      color: 0xff6b3d,
      roughness: 0.4,
      metalness: 0.1,
    });
    const backrest = new THREE.Mesh(backrestGeometry, backrestMaterial);
    backrest.position.set(0, 0.5, -0.85);
    backrest.rotation.z = 0.15; // Slight recline
    backrest.castShadow = true;
    chairGroup.add(backrest);

    // Chair armrests (left)
    const armrestGeometry = new THREE.BoxGeometry(0.12, 0.3, 0.35);
    const armrestMaterial = new THREE.MeshStandardMaterial({
      color: 0x2a2a2a,
      roughness: 0.5,
      metalness: 0.5,
    });
    const armrestLeft = new THREE.Mesh(armrestGeometry, armrestMaterial);
    armrestLeft.position.set(-0.35, 0.05, -1.2);
    armrestLeft.castShadow = true;
    chairGroup.add(armrestLeft);

    // Chair armrests (right)
    const armrestRight = new THREE.Mesh(armrestGeometry, armrestMaterial);
    armrestRight.position.set(0.35, 0.05, -1.2);
    armrestRight.castShadow = true;
    chairGroup.add(armrestRight);

    // Headrest/Neck pillow
    const neckPillowGeometry = new THREE.BoxGeometry(0.4, 0.15, 0.12);
    const neckPillowMaterial = new THREE.MeshStandardMaterial({
      color: 0xff6b3d,
      roughness: 0.5,
    });
    const neckPillow = new THREE.Mesh(neckPillowGeometry, neckPillowMaterial);
    neckPillow.position.set(0, 1.0, -0.7);
    chairGroup.add(neckPillow);

    deskGroup.add(chairGroup);
    scene.add(deskGroup);

    // Animation with GSAP
    gsap.to(deskGroup.rotation, {
      y: Math.PI * 2,
      duration: 30,
      repeat: -1,
      ease: "none",
    });

    // Mouse movement animation
    gsap.to(mouse.position, {
      x: 0.9,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // Cup breathing effect (subtle)
    gsap.to(cup.position, {
      y: 0.22,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // Lamp glow pulse
    gsap.to(lampHead.material, {
      emissiveIntensity: 0.5,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // Render loop
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  const onSubmit: SubmitHandler<Inputs> = (formData) => {
    window.location.href = `mailto:adeoyin2828@gmail.com?subject=${formData.subject}&body=Hi,my name is ${formData.name}. ${formData.message} (${formData.email})`;
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="relative w-full min-h-screen py-20 px-4 md:px-8 lg:px-12 flex items-center"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* LEFT: Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-red-400 via-red-300 to-red-200 bg-clip-text text-transparent">
              Get in Touch
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-red-400 to-transparent" />
          </div>

          <p className="text-gray-400 text-lg">
            I&#39;m always interested in hearing about new projects and opportunities.
          </p>

          {/* Contact Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <PhoneIcon className="text-red-400 h-6 w-6" />
              <span className="text-gray-300">+234 907 273 9445</span>
            </div>
            <div className="flex items-center gap-4">
              <EnvelopeIcon className="text-red-400 h-6 w-6" />
              <span className="text-gray-300">adeoyin2828@gmail.com</span>
            </div>
            <div className="flex items-center gap-4">
              <MapPinIcon className="text-red-400 h-6 w-6" />
              <span className="text-gray-300">Abuja, Nigeria</span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                {...register("name")}
                placeholder="Name"
                type="text"
                className="bg-gray-900 border border-gray-700 focus:border-red-400 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none transition-colors"
              />
              <input
                {...register("email")}
                placeholder="Email"
                type="email"
                className="bg-gray-900 border border-gray-700 focus:border-red-400 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none transition-colors"
              />
            </div>
            <input
              {...register("subject")}
              placeholder="Subject"
              type="text"
              className="w-full bg-gray-900 border border-gray-700 focus:border-red-400 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none transition-colors"
            />
            <textarea
              {...register("message")}
              placeholder="Message"
              rows={5}
              className="w-full bg-gray-900 border border-gray-700 focus:border-red-400 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none transition-colors resize-none"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-3 rounded-lg transition-all duration-200"
            >
              Send Message
            </motion.button>
          </form>
        </motion.div>

        {/* RIGHT: 3D Desk Model */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          ref={containerRef}
          className="hidden lg:block w-full h-[600px] rounded-xl overflow-hidden border border-gray-700 bg-black/50"
        />
      </div>

      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-500/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-400/5 rounded-full blur-3xl -z-10" />
    </motion.section>
  );
};

export default ContactMe;
