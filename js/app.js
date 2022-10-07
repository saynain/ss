"use strict";

import { PerspectiveCamera, Scene, WebGLRenderer } from "./build/three.module.js";
import SolarSystem from "./solarSystem.js";
import CameraController from "./CameraController.js";
import { VRButton } from "./build/VRButton.js";

export default class App {
        constructor() {
            this.width = window.innerWidth;
            this.height = window.innerHeight;
            this.aspect = this.width/this.height;

            this.fov = 100;
            this.near = 0.1;
            this.far = 5000;

            this.camera = new PerspectiveCamera(this.fov, this.aspect, this.near, this.far);

            this.camera.position.set(0, 35, 10);
            this.camera.lookAt(0, 0, 0);
            this.scene = new Scene();

            let canvas = document.createElement('canvas');
            let context = canvas.getContext('webgl2');

            this.renderer = new WebGLRenderer({
                canvas: canvas,
                context: context
            });

            this.renderer.setClearColor(0x000000);
            this.renderer.setSize(this.width, this.height);

            document.body.appendChild(this.renderer.domElement);

            this.solarSystem = new SolarSystem(this.scene, this.camera);
            this.cameraController = new CameraController(this.camera, this.solarSystem.planets);

            //this.controller = new FlyControls(this.camera, canvas);
            document.body.append(VRButton.createButton(this.renderer)); 
            this.renderer.xr.enabled = true;

            this.renderer.setAnimationLoop(this.render.bind(this));
            this.render();
        }

        render() {
            this.renderer.render(this.scene, this.camera);
            //window.requestAnimationFrame(this.render.bind(this));
            this.cameraController.animate();
            this.solarSystem.animate();
           // this.controller.update();
        }
}

new App();