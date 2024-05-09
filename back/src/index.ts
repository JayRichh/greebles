import { EntityManager } from "../../shared/entity/EntityManager.js";
import { Cube } from "./ecs/entity/Cube.js";
import { EventDestroyedComponent } from "../../shared/component/events/EventDestroyedComponent.js";
import { config } from "../../shared/network/config.js";
import { NetworkDataComponent } from "./ecs/component/NetworkDataComponent.js";
import { AnimationSystem } from "./ecs/system/AnimationSystem.js";
import { MovementSystem } from "./ecs/system/MovementSystem.js";
import { UpdateSizeSystem } from "./ecs/system/UpdateSizeSystem.js";
import { DestroySystem } from "./ecs/system/events/DestroySystem.js";
import { SyncSizeSystem } from "./ecs/system/events/SyncSizeSystem.js";
import { NetworkSystem } from "./ecs/system/network/NetworkSystem.js";
import { PhysicsSystem } from "./ecs/system/physics/PhysicsSystem.js";
import { SleepCheckSystem } from "./ecs/system/physics/SleepCheckSystem.js";
import { SyncPositionSystem } from "./ecs/system/physics/SyncPositionSystem.js";
import { SyncRotationSystem } from "./ecs/system/physics/SyncRotationSystem.js";
import Rapier from "./physics/rapier.js";
import { EventSizeComponent } from "./ecs/component/events/EventSizeComponent.js";
import { RandomSizeSystem } from "./ecs/system/RandomSizeSystem.js";
import { SyncColorSystem } from "./ecs/system/events/SyncColorSystem.js";
import { TrimeshSystem } from "./ecs/system/events/TrimeshSystem.js";
import { MapWorld } from "./ecs/entity/MapWorld.js";
import { BoundaryCheckSystem } from "./ecs/system/physics/BoundaryCheckSystem.js";
import { Sphere } from "./ecs/entity/Sphere.js";

// Initialize core systems
const entityManager = EntityManager.getInstance();
const physicsSystem = PhysicsSystem.getInstance();
const movementSystem = new MovementSystem();
const networkSystem = NetworkSystem.getInstance();

// Initialize synchronization systems
const syncPositionSystem = new SyncPositionSystem();
const syncRotationSystem = new SyncRotationSystem();
const syncSizeSystem = new SyncSizeSystem();
const syncColorSystem = new SyncColorSystem();

// Initialize utility systems
const updateSizeSystem = new UpdateSizeSystem();
const trimeshSystem = new TrimeshSystem();
const animationSystem = new AnimationSystem();
const destroySystem = new DestroySystem();
const sleepCheckSystem = new SleepCheckSystem();
const randomSizeSystem = new RandomSizeSystem();
const boundaryCheckSystem = new BoundaryCheckSystem();

// Create initial entities
new Cube(-50, 10, 0, 10, 10, 100);
new MapWorld();

// Periodically spawn cubes with random properties
setInterval(() => {
  const cube = new Cube(
    Math.random() * 10,
    Math.random() * 10 + 10,
    Math.random() * 10,
    1,
    1,
    1
  );

  if (Math.random() < 0.5) {
    cube.entity.addComponent(
      new EventSizeComponent(
        cube.entity.id,
        Math.random() * 5,
        Math.random() * 5,
        Math.random() * 5
      )
    );
  }

  // Schedule cube destruction after a delay
  setTimeout(() => {
    const destroyedComponent = new EventDestroyedComponent(cube.entity.id);
    const networkDataComponent = cube.entity.getComponent(NetworkDataComponent);
    if (networkDataComponent) {
      networkDataComponent.addComponent(destroyedComponent);
    }
    cube.entity.addComponent(destroyedComponent);
  }, 3000);
}, 3000);

// Spawn additional entities after a delay
setTimeout(() => {
  for (let i = 1; i < 3; i++) {
    for (let j = 1; j < 3; j++) {
      new Cube(i * 2, i * 2, j * 2, 1, 1, 1);
    }
  }
  new Sphere(0, 30, 0, 1);
}, 1000);

// Create the ground collider
const groundColliderDesc = Rapier.ColliderDesc.cuboid(10000.0, 0.1, 10000.0);
physicsSystem.world.createCollider(groundColliderDesc);

console.log(`Detected tick rate: ${config.TICKRATE}`);
let lastUpdateTimestamp = Date.now();

// Main game loop
async function gameLoop() {
  setTimeout(gameLoop, 1000 / config.TICKRATE);
  const now = Date.now();
  const dt = now - lastUpdateTimestamp;
  const entities = entityManager.getAllEntities();

  // Update systems
  await trimeshSystem.update(entities, physicsSystem.world);
  movementSystem.update(dt, entities, physicsSystem.world);
  animationSystem.update(entities);
  syncRotationSystem.update(entities);
  syncPositionSystem.update(entities);
  syncSizeSystem.update(entities);
  syncColorSystem.update(entities);
  networkSystem.update(entities);
  boundaryCheckSystem.update(entities);

  // Update physics and destroy entities
  physicsSystem.update();
  destroySystem.update(entities, entityManager, physicsSystem.world);

  // Check for sleeping entities at the end
  sleepCheckSystem.update(entities);

  lastUpdateTimestamp = now;
}

gameLoop();
