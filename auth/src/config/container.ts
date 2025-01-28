import { createContainer, asClass, InjectionMode, asValue } from 'awilix'
import { UserService } from '../user/services/user.service'
import { UserController } from '../user/controllers/user.controller'
import { AuthService } from '../auth/services/auth.service'
import { AuthController } from '../auth/controllers/auth.controller'

/**
 * Dependency Injection Container Configuration
 * 
 * This container manages the application's dependencies using Awilix.
 * It creates and maintains singleton instances of our services and controllers,
 * allowing for better dependency management and testability.
 * 
 * InjectionMode.CLASSIC means constructor parameters will match registered names.
 * Example: constructor(userService: UserService) will look for 'userService' in the container.
 */
const container = createContainer({
    injectionMode: InjectionMode.CLASSIC
})

/**
 * Register all application dependencies
 * 
 * asClass() - Registers a class to be instantiated when resolved
 * singleton() - Creates only one instance that's reused for all resolutions
 * 
 * Services:
 * - userService: Handles user-related business logic
 * - xataService: Database interaction service
 * 
 * Controllers:
 * - userController: Manages user-related HTTP endpoints
 * - authController: Manages authentication-related HTTP endpoints
 */
container.register({
    userService: asClass(UserService).singleton(),
    userController: asClass(UserController).singleton(),
    authService: asClass(AuthService).singleton(),
    authController: asClass(AuthController).singleton(),
})

export { container }