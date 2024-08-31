import { IArkhamCardsCampaign, IArkhamCardsScenarioDetail } from "@/types/arkhamCards";
import { unique } from "@/util/common";
import { ICampaign } from "../campaigns";

export const scenarioToEncounterSets = ({ steps }: IArkhamCardsScenarioDetail) => {
  const step = steps.find(({ type }) => type === 'encounter_sets');

  return step?.encounter_sets || [];
}

export const transformArkhamCardsCampaign = ({ campaign, scenarios }: IArkhamCardsCampaign): ICampaign => {
  const encounterSets = scenarios.map(scenarioToEncounterSets).flat();
  const uniqueEncounterSets = unique(encounterSets);

  return {
    unique_encounter_sets: uniqueEncounterSets,
    campaign,
    scenarios: scenarios.map(({ 
        id,
        scenario_name,
        full_name,
        setup,
        icon
      }) => ({
        id, 
        scenario_name,
        full_name,
        setup,
        icon
      }))
  }
}
