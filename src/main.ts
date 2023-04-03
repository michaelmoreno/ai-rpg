import { Clock } from './engine/Clock';
import { Engine } from './engine/Engine';

const clock = new Clock();
const engine = new Engine(clock);
engine.initialize();
engine.run()
