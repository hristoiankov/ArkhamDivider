import { ArkhamDivider } from "arkham-divider-data";
import { Defined, Single } from "./util";

export type IStory = Single<ArkhamDivider.Core['stories']>
export type IEncounterSet = Single<ArkhamDivider.Core['encounterSets']>;
export type IEncounterSetType = Single<Defined<IEncounterSet['types']>>;
export type IScenario = Defined<IStory['scenario']>;
export type ICustomContent = Defined<IStory['custom_content']>;
export type IInvestigator = Single<IStory['investigators']>;