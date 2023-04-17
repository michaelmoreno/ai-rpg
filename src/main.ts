import { EngineChannelsAPI } from './engine/Engine';
import { Clock } from './engine/Clock';
import { Engine } from './engine/Engine';
import { Broker } from './patterns/PublishSubscribe';

const clock = new Clock();
const broker = new Broker<EngineChannelsAPI>();
const engine = new Engine(broker);
engine.initialize();
engine.run()
