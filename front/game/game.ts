import * as THREE from 'three'
import { EntityManager } from '@shared/entity/EntityManager'
import { WebSocketManager } from './WebsocketManager'
import { InputManager } from './InputManager'
import { config } from '@shared/network/config'
import { LoadManager } from './LoadManager'
import { Renderer } from './renderer'
import { Camera } from './camera'
import {
	SyncComponentsSystem,
	SyncPositionSystem,
	SyncRotationSystem,
	SyncColorSystem,
	SyncSizeSystem,
	CameraFollowSystem,
	AnimationSystem,
	DestroySystem,
} from './ecs/system'
import { Entity } from '@shared/entity/Entity'

export class Game {
	private static instance: Game
	public entityManager = EntityManager.getInstance()
	private lastRenderTime = Date.now()
	private loopFunction: () => void = this.loop.bind(this)
	public cameraFollowSystem: CameraFollowSystem
	public syncComponentSystem: SyncComponentsSystem
	public currentPlayerEntityId: number | undefined
	private syncPositionSystem: SyncPositionSystem
	private syncRotationSystem: SyncRotationSystem
	private syncColorSystem: SyncColorSystem
	private syncSizeSystem: SyncSizeSystem
	private websocketManager: WebSocketManager
	private animationSystem: AnimationSystem
	private destroySystem: DestroySystem
	public loadManager: LoadManager
	private inputManager: InputManager
	public renderer: Renderer
	// public camera: Camera

	private constructor() {
		this.cameraFollowSystem = new CameraFollowSystem()
		this.syncComponentSystem = new SyncComponentsSystem(this)
		this.syncPositionSystem = new SyncPositionSystem()
		this.syncRotationSystem = new SyncRotationSystem()
		this.syncColorSystem = new SyncColorSystem()
		this.syncSizeSystem = new SyncSizeSystem()
		this.websocketManager = new WebSocketManager(this)
		this.animationSystem = new AnimationSystem()
		this.loadManager = new LoadManager()
		this.destroySystem = new DestroySystem()
		this.renderer = new Renderer(new THREE.Scene(), this.loadManager)
		this.inputManager = new InputManager(this.websocketManager, this.renderer)
	}

	public static getInstance(): Game {
		if (!Game.instance) {
			Game.instance = new Game()
		}
		return Game.instance
	}

	public async start() {
		// wait for the sock to dock
		await this.websocketManager.connect()
		this.renderer.appendChild()
		this.renderer.setAnimationLoop(this.loopFunction)
	}
	private loop() {
		const entities = this.entityManager.getAllEntities()
		const input = this.inputManager.inputState
		const now = Date.now()
		const deltaTime = (now - this.lastRenderTime) / 1000
		const interp = { pos: 0.2, rot: 0.5 }

		this.websocketManager.update()
		this.inputManager.updateInputState()

		this.syncPositionSystem.update(entities, interp.pos)
		this.syncRotationSystem.update(entities, interp.rot)
		this.cameraFollowSystem.update(deltaTime, entities, input)
		this.syncColorSystem.update(entities)
		this.syncSizeSystem.update(entities)

		this.animationSystem.update(deltaTime, entities)
		this.destroySystem.update(entities, this.entityManager, this.renderer)

		this.renderer.update(deltaTime)

		this.lastRenderTime = now
		this.websocketManager.timeSinceLastServerUpdate += deltaTime
	}
}
