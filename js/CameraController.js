import {
	Camera,
	EventDispatcher,
	Quaternion,
	Vector3
} from './build/three.module.js';

export default class CameraController {
    /**
     * 
     * @param {Camera} camera 
     * @param {Object} planets 
     */
    constructor(camera, planets) {

        this.planets = planets;
        this.camera = camera;
        this.currentPlanet = 0;
        this.#createEventListeners();
        this.planetsArr = [];
        let counter = 0;
        this.moveVector = new Vector3(0, 0, 0);
        for (const planet in this.planets) {
            console.log(`${planet}: ${this.planets[planet]}`);
            this.planetsArr[counter] = this.planets[planet];
            counter++;
        }
        this.cameraMovement = {
            left: 0,
            right: 0,
            forward: 0,
            back: 0,
            up: 0,
            down: 0,
            movespeed: 0.5,
            velocity: 0
        }
        this.lastUpdate = 0;
    }

    #createEventListeners() {
        document.addEventListener('keydown', (e) => {
            e = e || window.event;
            
            if (e.key === 'ArrowRight') {
                this.currentPlanet++;
                if(this.currentPlanet >= this.planetsArr.length-1) {
                    this.currentPlanet = 0;
                }
                this.planetsArr[this.currentPlanet].add(this.camera);
                this.camera.lookAt(this.planetsArr[this.currentPlanet].position);
            }
            if (e.key === 'ArrowLeft') {
                this.currentPlanet--;
                if(this.currentPlanet <= 0) {
                    this.currentPlanet = this.planetsArr.length-1;
                }
                this.planetsArr[this.currentPlanet].add(this.camera);
                this.camera.lookAt(this.planetsArr[this.currentPlanet].position);
            }
            if(e.key === "w") {
                this.cameraMovement.forward = 1;
                console.log("KeyW");
            }
            if(e.key === "s") {
                this.cameraMovement.back = 1;
                console.log("KeyS");
            }
            if(e.key === "a") {
                this.cameraMovement.left = 1;
                console.log("KeyA");
            }
            if(e.key === "d") {
                this.cameraMovement.right = 1;
                console.log("KeyD");
            }
            if(e.key === "Shift") {
                this.cameraMovement.down = 1;
                console.log("Shift");
            }
            if(e.key === " ") {
                this.cameraMovement.up = 1;
                console.log("Space");
            }
            this.updateMovementVector();
        });

        document.addEventListener('keyup', (e) => {
            e = e || window.event;

            if(e.key === "w") {
                this.cameraMovement.forward = 0;
            }
            if(e.key === "s") {
                this.cameraMovement.back = 0;
            }
            if(e.key === "a") {
                this.cameraMovement.left = 0;
            }
            if(e.key === "d") {
                this.cameraMovement.right = 0;
            }
            if(e.key === "Shift") {
                this.cameraMovement.down = 0;
                console.log("Shift");
            }
            if(e.key === " ") {
                this.cameraMovement.up = 0;
                console.log("Space");
            }
            this.updateMovementVector();
        });
    }

    updateMovementVector() {
        this.moveVector.x = - this.cameraMovement.left + this.cameraMovement.right;
        this.moveVector.y = - this.cameraMovement.down + this.cameraMovement.up;
        this.moveVector.z = - this.cameraMovement.forward + this.cameraMovement.back;

        console.log( 'move:', [ this.moveVector.x, this.moveVector.y, this.moveVector.z ] );
        this.cameraMovement.velocity = this.cameraMovement.movespeed;
    };

    animate() {
        this.camera.lookAt(this.planets.sun.position);
        let now = Date.now();
        let delta = now - this.lastUpdate;
        this.lastUpdate = now;
        let movespeed = this.cameraMovement.velocity * delta;

        if(this.cameraMovement.velocity < 0) {
            this.cameraMovement.velocity = 0
        } else {
            this.cameraMovement.velocity -= 0.01;
        }

        this.camera.translateX( this.moveVector.x * movespeed);
		this.camera.translateY( this.moveVector.y * movespeed);
		this.camera.translateZ( this.moveVector.z * movespeed);
        
    }
}