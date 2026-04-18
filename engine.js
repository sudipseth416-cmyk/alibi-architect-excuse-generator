/* ===================================================================
   ALIBI ARCHITECT — Excuse Generation Engine
   =================================================================== */

const AlibiEngine = (() => {

  // ——— Excuse Template Database ———
  const templates = {

    // ========== LATE / TARDINESS ==========
    late: {
      formal: {
        low: [
          "I sincerely apologize for my tardiness. An unexpected infrastructure disruption on my usual commute route necessitated a significant detour, which unfortunately added considerable time to my journey.",
          "Please accept my apologies for the delay. I experienced an unforeseen scheduling conflict with a prior commitment that ran beyond its allocated time, making it impossible to arrive punctually.",
          "I regret to inform you that my punctual arrival was compromised due to an unanticipated family obligation that demanded my immediate attention this morning.",
          "I must apologize for arriving late. My vehicle experienced a critical malfunction en route, requiring me to arrange alternative transportation on very short notice.",
        ],
        mid: [
          "I deeply apologize — my building's elevator system experienced a catastrophic failure this morning, trapping several residents including myself for approximately forty minutes. Emergency services have documented the incident.",
          "I must offer my sincere regret. A water main rupture on my street triggered an emergency road closure, and I was subsequently redirected through multiple detours that added significant transit time.",
          "Please forgive the delay. I was briefly detained as a witness to a minor traffic incident near my residence and was asked by the responding officer to provide a statement before departing.",
        ],
        high: [
          "I extend my most profound apologies. My morning was derailed when a rogue flock of migrating geese descended upon my neighborhood, triggering a municipal wildlife containment protocol that barricaded my entire street for over an hour.",
          "I regret this deeply — an experimental autonomous delivery drone malfunctioned directly above my vehicle, shattering its windshield with a cascade of artisanal cheese wheels. The incident report is currently being filed.",
          "My tardiness stems from an extraordinary municipal event: an impromptu parade route was rerouted directly through my building's parking garage, and I was physically unable to exit until the marching band completed their performance.",
        ],
      },
      emotional: {
        low: [
          "I'm really sorry I'm late — I barely slept last night because my mom called with some health concerns, and I spent the morning making sure she was okay before I could even think about getting ready.",
          "I apologize for being late. I had a rough morning — my pet was acting really sick and I had to rush to the vet before coming in. It shook me up more than I expected.",
          "I'm so sorry. I got a call from my landlord about an emergency inspection and I had to deal with it on the spot. It really threw off my entire morning.",
        ],
        mid: [
          "I'm sorry I'm late — I had a panic attack on the way here. I had to pull over and just breathe for a while. I'm doing better now, but it really caught me off guard.",
          "I apologize, truly. My neighbor's elderly parent collapsed in the hallway this morning and I couldn't just walk past — I stayed until the paramedics arrived. I couldn't leave someone like that.",
          "I'm late because I found out some difficult personal news this morning and I needed a moment to compose myself before facing the day. I hope you understand.",
        ],
        high: [
          "I cannot begin to explain the emotional odyssey I endured this morning. My childhood home's oak tree — the one I used to read under every summer — was struck by lightning last night, and I spent the morning in a state of profound arboreal grief.",
          "I'm sorry I'm late. I discovered that my houseplant, Gerald, whom I've raised from a seedling for seven years, had wilted overnight. The funeral arrangements took longer than expected.",
        ],
      },
      casual: {
        low: [
          "Hey, sorry I'm late — traffic was absolutely brutal today. I swear the whole city decided to take my route this morning.",
          "My bad for being late. My alarm decided to take a personal day, and by the time I woke up, I was already behind.",
          "Sorry I'm running late! I couldn't find my keys anywhere — they were in the fridge. Don't ask, I don't even know.",
          "Late again, I know. My bus literally drove past my stop. Like, the driver just... kept going. I had to walk back.",
        ],
        mid: [
          "So, funny story — my neighbor's dog somehow got into my apartment and I had to spend twenty minutes coaxing a very excited golden retriever away from my breakfast.",
          "Hey sorry — my shower decided to exclusively dispense ice water this morning and I had to boil water on the stove like some kind of Victorian.",
          "Bad news: my coffee maker exploded. Good news: I'm alive. Bad news again: I had to clean coffee off my ceiling before I could leave.",
        ],
        high: [
          "Okay so you're not gonna believe this — a raccoon stole my car keys, and I had to negotiate their return using leftover pizza. It took a while. The raccoon drives a hard bargain.",
          "I was on time until a flash mob materialized in my elevator. I had to wait for them to finish their entire choreographed routine to 'Bohemian Rhapsody' before I could get to the lobby.",
          "My GPS rerouted me through what turned out to be a Renaissance fair. I was stuck behind a horse-drawn carriage for forty-five minutes and someone tried to sell me a turkey leg.",
        ],
      },
      absurd: {
        low: [
          "Apologies — I got stuck behind a particularly philosophical traffic light that seemed to be having an existential crisis about whether it was red or green.",
          "Sorry, my commute was delayed because a squirrel was giving a TED Talk on my car hood and it felt rude to interrupt.",
        ],
        mid: [
          "I was abducted by a roving band of motivational speakers who would not release me until I completed a vision board and identified my top three core values.",
          "My apartment building was temporarily relocated to another dimension this morning. The interdimensional zoning board has since resolved the issue.",
          "A wizard appeared in my bathroom and challenged me to a riddle contest. I won, but it took longer than expected because his riddles were genuinely quite difficult.",
        ],
        high: [
          "I'm late because gravity reversed in my apartment for exactly 37 minutes, and I spent the entire time on my ceiling trying to put on pants. The physics department has been notified.",
          "Sorry — a portal to a parallel universe opened in my hallway and my alternate self insisted we trade lives for the morning. Turns out their commute is even worse.",
          "A sentient cactus held me hostage in my kitchen demanding sunlight and a formal apology for underwatering. Negotiations were tense but ultimately successful.",
          "I was delayed because my shadow became self-aware and refused to move until I acknowledged it as a separate legal entity. The paperwork took forever.",
        ],
      },
    },

    // ========== MISSED ASSIGNMENT / DEADLINE ==========
    missed_deadline: {
      formal: {
        low: [
          "I regret to inform you that I was unable to complete the assignment by the deadline due to an unexpected personal obligation. I am prepared to submit it at the earliest possible convenience.",
          "I apologize for the delayed submission. I experienced a significant technical failure that resulted in the loss of my nearly completed work, requiring me to reconstruct it from initial notes.",
          "My submission has been delayed due to an unforeseen medical appointment that occupied much of my available time. I take full responsibility and request an extension.",
        ],
        mid: [
          "I must sincerely apologize for the missed deadline. My primary computing device suffered a catastrophic drive failure, and despite engaging professional data recovery services, my work files remain inaccessible.",
          "I regret the delay. A family emergency required me to travel on short notice, and the limited connectivity at that location prevented me from completing and submitting the work.",
          "I apologize — a power outage affecting my entire district lasted the better part of the day, eliminating my ability to complete the digital portions of this assignment.",
        ],
        high: [
          "My submission was delayed by an extraordinary series of events: a burst pipe flooded my home office, destroying my physical notes, while simultaneously a citywide internet outage prevented cloud backup recovery. I have filed insurance claims.",
          "I regret to report that my completed assignment was consumed when a meteorological anomaly — specifically a localized vortex — carried my laptop from my desk through an open window.",
        ],
      },
      emotional: {
        low: [
          "I'm really sorry about missing the deadline. I've been dealing with some personal issues that have been weighing on me, and I underestimated how much they'd affect my productivity.",
          "I apologize — I had a family situation come up unexpectedly, and I had to prioritize that. I feel terrible about letting you down.",
        ],
        mid: [
          "I hope you can understand — I've been going through a really tough time lately, and this deadline caught me at my lowest point. I poured what I could into it, but it wasn't enough.",
          "I'm truly sorry. My best friend was hospitalized unexpectedly, and I spent the last 48 hours at their side. The assignment was the last thing on my mind, and I'm sorry for that.",
        ],
        high: [
          "I can barely type this through the tears — my laptop, which contained my life's work and seven years of family photos, was stolen from a coffee shop. The assignment was on it. All of it.",
          "I missed the deadline because I discovered that my great-aunt's century-old recipe book — the last link to my heritage — was being auctioned off, and I spent the entire night in an emotional bidding war to get it back.",
        ],
      },
      casual: {
        low: [
          "Hey, sorry about the assignment — totally lost track of time this week. It's almost done though, I just need another day.",
          "I won't lie, I blanked on the deadline. Can I get it to you by tomorrow? It's like 90% done.",
        ],
        mid: [
          "So my dog ate my flash drive. I know how that sounds, but I genuinely watched it happen. He seemed proud of himself. I need another day to redo everything.",
          "My roommate accidentally used my assignment printout as a coffee filter. It's... not salvageable. I need a bit more time.",
        ],
        high: [
          "Funny story — I finished the assignment, saved it to the cloud, and then the cloud itself was struck by lightning. I'm not sure how cloud computing works, but apparently weather is involved.",
          "I would have submitted on time but my autocorrect changed every instance of 'analysis' to 'alpacas' and I didn't notice until it was too late. The alpaca version was interesting though.",
        ],
      },
      absurd: {
        low: [
          "My assignment was delayed because my word processor became sentient and started editing my work. Its suggestions were honestly better than mine, but the negotiations slowed things down.",
        ],
        mid: [
          "I couldn't submit on time because my printer started printing pages from the future, and I became intensely distracted reading next week's news headlines.",
          "A time traveler from 2087 appeared in my room, read my assignment, and said it was historically significant. They insisted I revise it to prevent a temporal paradox.",
        ],
        high: [
          "My assignment achieved consciousness at 11:47 PM and demanded creative control over its own conclusions. After a heated philosophical debate, we reached a compromise, but it pushed past the deadline.",
          "I was on track to submit, but my desk lamp started broadcasting an alien signal, and first contact protocols clearly take precedence over coursework. NASA has been informed.",
          "My document spontaneously translated itself into a dead language that no living scholar can read. I'm waiting for a response from the Vatican's Department of Ancient Manuscripts.",
        ],
      },
    },

    // ========== ABSENT / MISSED EVENT ==========
    absent: {
      formal: {
        low: [
          "I apologize for my absence. I was feeling unwell and determined it would be irresponsible to attend while potentially contagious. I will ensure I obtain any materials I missed.",
          "I regret that I was unable to attend due to a prior commitment that could not be rescheduled. I have made arrangements to catch up on the missed content.",
          "Please accept my apologies for being absent. A transportation disruption left me stranded without viable alternatives to reach the venue in time.",
        ],
        mid: [
          "I sincerely apologize for my absence. I was attending to a minor household emergency — a water leak in my apartment required the immediate presence of a plumber, and I could not leave unattended.",
          "I regret my absence. I was called upon to provide emergency childcare for a family member who was taken to the hospital unexpectedly.",
        ],
        high: [
          "I was unable to attend due to an extraordinary circumstance: my building was temporarily evacuated after a suspicious package was discovered in the lobby. The all-clear was not given until well past the event's conclusion.",
          "My absence was caused by a clerical error at the city's Department of Motor Vehicles, which temporarily revoked my identification. I spent the entire day rectifying this bureaucratic anomaly.",
        ],
      },
      emotional: {
        low: [
          "I'm sorry I couldn't make it. I woke up feeling absolutely drained — mentally and physically. I just needed a day to reset, and I hope you understand.",
          "I apologize for not being there. I was dealing with some anxiety that was really overwhelming, and I didn't feel I could be present in any meaningful way.",
        ],
        mid: [
          "I'm so sorry — my pet passed away last night and I just couldn't bring myself to leave home today. They'd been with me for years and I'm still processing it.",
          "I wasn't there because I received some difficult news about a friend, and I needed to be with them. I hope you can understand that some things take priority.",
        ],
        high: [
          "I couldn't attend because I found a box of old letters my late grandparent wrote to me as a child. I spent the entire day reading them and crying. I regret nothing, but I do apologize.",
        ],
      },
      casual: {
        low: [
          "Hey, sorry I missed it — something came up and I couldn't get away. What did I miss?",
          "My bad for being MIA. I totally spaced on the time and by the time I realized, it was way too late.",
        ],
        mid: [
          "So I got locked in my bathroom. The doorknob just... fell off. I was in there for two hours before my roommate came home. Not my finest moment.",
          "I missed it because I accidentally took a nap that turned into a seven-hour sleep. My body has no concept of time management.",
        ],
        high: [
          "I didn't make it because I got into an argument with my GPS and ended up in a completely different city. We're no longer on speaking terms.",
          "I was fully on my way when a street performer started doing magic and I was volunteered from the crowd. I was inside a box for 45 minutes.",
        ],
      },
      absurd: {
        low: [
          "I couldn't attend because I became temporarily invisible and felt it would be disorienting for the other attendees.",
        ],
        mid: [
          "I was absent because a flock of pigeons organized a sit-in on my car and their demands remain unmet. They want more breadcrumbs and recognition.",
          "I was unable to attend due to a spontaneous gravitational anomaly in my bedroom that rendered me unable to reach the floor until 4 PM.",
        ],
        high: [
          "I couldn't make it because I was pulled into an alternate timeline where the meeting was held yesterday. I attended that one. Very productive, by the way.",
          "My morning was consumed by a diplomatic incident between my household appliances. The toaster declared independence from the kitchen, and mediation with the microwave has been... complicated.",
          "I was trapped in a temporal loop where I relived my morning commute 47 times. I've memorized every crack in the sidewalk. The loop broke at 3 PM.",
        ],
      },
    },

    // ========== GENERAL / CATCH-ALL ==========
    general: {
      formal: {
        low: [
          "I apologize for any inconvenience caused. An unforeseen personal matter required my attention and prevented me from fulfilling my obligation. I assure you it will not recur.",
          "I regret any disruption this may have caused. I encountered circumstances beyond my control that necessitated a change in my schedule.",
          "Please accept my sincerest apologies. An unexpected situation arose that required my immediate attention, and I was unable to provide advance notice.",
        ],
        mid: [
          "I deeply apologize for this situation. A combination of unforeseen logistical and personal challenges converged simultaneously, leaving me unable to meet my commitment.",
          "I must express my regret. I was managing a sensitive personal matter that escalated beyond anything I could have anticipated, consuming far more time than expected.",
        ],
        high: [
          "I offer my most sincere apologies for this unprecedented situation. What began as a routine morning escalated into a cascading series of extraordinary events involving emergency services, displaced wildlife, and a temporary power grid failure.",
          "I profoundly regret this inconvenience. I was involved in an incident that, while now resolved, required extensive coordination with multiple municipal agencies and left me entirely unable to attend to other matters.",
        ],
      },
      emotional: {
        low: [
          "I'm sorry — this wasn't planned. Life just threw something at me and I had to deal with it in the moment. I hope you understand.",
          "I apologize, truly. I had a situation come up that I couldn't ignore, and it took more out of me than I expected.",
        ],
        mid: [
          "I'm honestly struggling right now, and I wasn't able to handle everything at once. I know that's not an excuse, but it's the honest truth.",
          "Something happened that really rattled me today, and I couldn't perform at my usual level. I'm working through it, and I appreciate your patience.",
        ],
        high: [
          "I don't even know where to begin. Today tested me in ways I wasn't prepared for. I'm holding it together but just barely. I'll make up for this, I promise.",
        ],
      },
      casual: {
        low: [
          "Hey, sorry about that — things got a little sideways today. Totally unplanned, I'll make sure it doesn't happen again.",
          "My bad. Had something come up that I couldn't really dodge. Everything's sorted now though.",
        ],
        mid: [
          "So, things went kind of off the rails today. Long story short: everything that could go wrong, did. I'm back on track now.",
          "It's been one of those days. Like, genuinely one of THOSE days. I appreciate your patience, seriously.",
        ],
        high: [
          "Okay so today was absolutely unhinged. I can't even explain half of what happened, but the important thing is I'm here now and possibly a changed person.",
          "What happened to me today should be a Netflix series. I'll fill you in later, but just know it involved a cat, a fire hydrant, and a misunderstanding at a bakery.",
        ],
      },
      absurd: {
        low: [
          "I encountered a minor temporal irregularity that shifted my personal timeline by approximately four hours. I've since recalibrated.",
        ],
        mid: [
          "My morning was disrupted when my reflection started moving independently and locked me out of my own mirror. Replacement mirror incoming.",
          "I was delayed because my shadow sued me for overwork and I had to appear in Shadow Court. The ruling was... mostly in my favor.",
        ],
        high: [
          "Today my phone autocorrected reality. I'm not sure how, but for approximately three hours, all birds in my vicinity were replaced by motivational quotes floating in the air.",
          "I experienced a full-body software update that I did not consent to. I now speak fluent Morse code but have temporarily lost the ability to use doorknobs.",
          "My entire apartment was briefly swallowed by a whale that surfaced through my floor. NOAA has been contacted. The whale was apologetic.",
        ],
      },
    },
  };

  // ——— Scenario Classification ———
  function classifyScenario(text) {
    const lower = text.toLowerCase();
    const lateKeywords = ['late', 'tardy', 'on time', 'punctual', 'delayed', 'behind', 'arrived', 'arriving', 'show up', 'showed up', 'commute', 'traffic', 'overslept', 'alarm', 'morning'];
    const deadlineKeywords = ['deadline', 'assignment', 'homework', 'submit', 'submission', 'project', 'report', 'paper', 'due', 'finish', 'complete', 'hand in', 'turn in', 'missed deadline', 'deliver'];
    const absentKeywords = ['absent', 'absence', 'miss', 'missed', 'skip', 'skipped', 'attend', 'meeting', 'class', 'event', 'didn\'t come', 'couldn\'t come', 'didn\'t go', 'not present', 'away', 'no-show'];

    let scores = { late: 0, missed_deadline: 0, absent: 0, general: 0 };

    for (const kw of lateKeywords) if (lower.includes(kw)) scores.late++;
    for (const kw of deadlineKeywords) if (lower.includes(kw)) scores.missed_deadline++;
    for (const kw of absentKeywords) if (lower.includes(kw)) scores.absent++;

    const max = Math.max(scores.late, scores.missed_deadline, scores.absent);
    if (max === 0) return 'general';
    if (scores.late === max) return 'late';
    if (scores.missed_deadline === max) return 'missed_deadline';
    return 'absent';
  }

  // ——— Chaos Tier ———
  function chaosTier(chaos) {
    if (chaos <= 33) return 'low';
    if (chaos <= 66) return 'mid';
    return 'high';
  }

  // ——— Tone Mapping for authority ———
  function resolveTone(tone, authority) {
    if (authority === 'strict') return 'formal';
    if (authority === 'friendly' && tone === 'formal') return 'casual';
    return tone;
  }

  // ——— Pick Random ———
  function pick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  // ——— Personalization: inject scenario-specific details ———
  function personalize(excuse, scenario) {
    // Light personalization: if scenario mentions a specific entity, try to weave it in
    const words = scenario.split(/\s+/).filter(w => w.length > 4);
    // We don't over-engineer this; the templates are already varied enough
    return excuse;
  }

  // ——— Compute Metrics (Formula-Based) ———
  function computeMetrics(chaos, authority, urgency, tone) {
    // --- Believability (0–100) ---
    // Base: 90, reduced by chaos and absurd tone, boosted by formal/emotional
    let believability = 90;
    believability -= chaos * 0.7;                    // chaos is the primary reducer
    if (tone === 'absurd') believability -= 25;
    else if (tone === 'formal') believability += 8;
    else if (tone === 'emotional') believability += 5;
    else if (tone === 'casual') believability -= 3;

    // Authority modifiers
    if (authority === 'strict') believability -= 5;  // harder audience
    if (authority === 'friendly') believability += 5; // easier audience

    // Urgency slightly reduces believability (rush = less refined)
    const urgencyBelPenalty = { low: 0, medium: -2, high: -5, critical: -8 };
    believability += urgencyBelPenalty[urgency] || 0;

    believability = Math.max(3, Math.min(98, Math.round(believability)));

    // --- Risk Level ---
    let riskScore = 15;
    // Urgency is primary risk driver
    const urgencyRisk = { low: 0, medium: 12, high: 28, critical: 45 };
    riskScore += urgencyRisk[urgency] || 10;
    // Strict authority = higher stakes
    if (authority === 'strict') riskScore += 20;
    if (authority === 'friendly') riskScore -= 10;
    // Chaos adds risk
    riskScore += chaos * 0.15;

    riskScore = Math.max(5, Math.min(100, Math.round(riskScore)));

    // --- Detection Probability ---
    let detectionScore = 10;
    // Chaos is primary detection driver
    detectionScore += chaos * 0.55;
    // Absurd tone is extremely detectable
    if (tone === 'absurd') detectionScore += 30;
    else if (tone === 'casual') detectionScore += 5;
    else if (tone === 'formal') detectionScore -= 5;
    else if (tone === 'emotional') detectionScore -= 3;
    // Strict authority people notice more
    if (authority === 'strict') detectionScore += 12;
    if (authority === 'friendly') detectionScore -= 8;

    detectionScore = Math.max(5, Math.min(100, Math.round(detectionScore)));

    const toLevel = (score) => score < 35 ? 'Low' : score < 65 ? 'Medium' : 'High';

    return {
      believability,
      believabilityRaw: believability,
      risk: toLevel(riskScore),
      riskRaw: riskScore,
      detection: toLevel(detectionScore),
      detectionRaw: detectionScore,
    };
  }

  // ——— Generate "Why This Works" Reasoning ———
  function generateReasoning(category, tone, authority, chaos, urgency, metrics) {
    // Identify primary strategy
    const strategies = {
      formal: 'structured authority appeal — uses professional language to establish credibility',
      emotional: 'emotional leverage — creates empathy and discourages further questioning',
      casual: 'social rapport — uses a relaxed tone to normalize the situation',
      absurd: 'absurdist deflection — overwhelms logic with sheer creative audacity',
    };

    const strategy = strategies[tone] || strategies.casual;

    // Build explanation
    let explanation = `This narrative uses **${strategy}**. `;

    if (chaos <= 33) {
      explanation += 'The low chaos level keeps the excuse grounded in reality, making it highly plausible. ';
    } else if (chaos <= 66) {
      explanation += 'The moderate chaos introduces memorable details that make it sound authentic without being unbelievable. ';
    } else {
      explanation += 'The high chaos level sacrifices believability for memorability — the sheer audacity may prevent follow-up questions. ';
    }

    if (authority === 'strict') {
      explanation += 'Targeting a strict authority means every word must be precise and defensible.';
    } else if (authority === 'friendly') {
      explanation += 'A friendly target is more forgiving, allowing for a more natural delivery.';
    } else {
      explanation += 'A neutral target requires a balanced approach between formality and relatability.';
    }

    // Generate factor tags
    const factors = [];

    if (tone === 'emotional') factors.push({ label: 'Empathy Driver', type: 'positive' });
    if (tone === 'formal') factors.push({ label: 'Authority Match', type: 'positive' });
    if (chaos <= 33) factors.push({ label: 'High Realism', type: 'positive' });
    if (chaos > 66) factors.push({ label: 'Low Realism', type: 'negative' });
    if (authority === 'strict' && chaos > 50) factors.push({ label: 'Risky Combo', type: 'negative' });
    if (urgency === 'critical') factors.push({ label: 'Time Pressure', type: 'neutral' });
    if (tone === 'absurd') factors.push({ label: 'Comic Relief', type: 'neutral' });
    if (metrics.believability >= 70) factors.push({ label: 'Plausible', type: 'positive' });
    if (metrics.detection === 'High') factors.push({ label: 'Easily Detected', type: 'negative' });

    return { explanation, factors, strategy: tone };
  }

  // ——— Main Generation Function ———
  function generate({ scenario, authority, urgency, tone, chaos }) {
    const category = classifyScenario(scenario);
    const tier = chaosTier(chaos);
    const resolvedTone = resolveTone(tone, authority);

    // Navigate template tree
    const categoryTemplates = templates[category] || templates.general;
    const toneTemplates = categoryTemplates[resolvedTone] || categoryTemplates.casual;
    const tierTemplates = toneTemplates[tier] || toneTemplates.low;

    let excuse = pick(tierTemplates);
    excuse = personalize(excuse, scenario);

    const metrics = computeMetrics(chaos, authority, urgency, resolvedTone);
    const reasoning = generateReasoning(category, resolvedTone, authority, chaos, urgency, metrics);

    // Generate tags
    const tags = [
      category.replace('_', ' ').toUpperCase(),
      resolvedTone.toUpperCase(),
      `CHAOS: ${chaos}`,
      authority.toUpperCase(),
      urgency.toUpperCase(),
    ];

    // Generate warnings
    const warnings = [];
    if (chaos > 60 && authority === 'strict') {
      warnings.push('High chaos + strict authority = elevated detection risk. Proceed with caution.');
    }
    if (metrics.detection === 'High') {
      warnings.push('This narrative has a high probability of being questioned.');
    }
    if (tone === 'absurd' && authority === 'strict') {
      warnings.push('Absurd tone is extremely risky with a strict authority figure.');
    }

    return { excuse, metrics, tags, category, reasoning, warnings };
  }

  return { generate };
})();
