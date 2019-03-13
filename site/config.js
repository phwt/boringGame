buildings = {
    "1_biof":{
        name: "Biofuel Plant",
        description: "Power from the living matter",
        icon: "bldg/biofuel.png",
        base_cost: 20,
        base_speed: 1
    },
    "2_coal":{
        name: "Fossil-fuel Power Plant",
        description: "Burn a thing leftover by our predecessor",
        icon: "bldg/ar.png",
        base_cost: 100,
        base_speed: 4
    },
    "3_sun":{
        name: "Photovoltaic Station",
        description: "Travels many millions miles to power us...and melts our chocolate",
        icon: "bldg/power.png",
        base_cost: 700,
        base_speed: 8
    },
    "4_wind":{
        name: "Wind Farm",
        description: "Make a use of a whirlwind",
        icon: "bldg/energy.png",
        base_cost: 14000,
        base_speed: 50
    },
    "5_water":{
        name: "Hydroelectric Dam",
        description: "Let the current and gravity do the job",
        icon: "bldg/hydro.png",
        base_cost: 300000,
        base_speed: 200
    },
    "6_oil":{
        name: "Offshore Rig",
        description: "Excavate raw energy from the middle of the ocean",
        icon: "bldg/drilling-rig.png",
        base_cost: 500000,
        base_speed: 1500
    },
    "7_thermal":{
        name: "Geothermal Plant",
        description: "Earth powering the earth",
        icon: "bldg/earth.png",
        base_cost: 50000000,
        base_speed: 8000
    },
    "8_nuke":{
        name: "Nuclaer Power Station",
        description: "From a weapon of mass destruction to long-lasting clean enegy",
        icon: "bldg/atom.png",
        base_cost: 120000000,
        base_speed: 40000
    }
}

upgrades = {
    "dig1":{
        name: "Generator Upgrade 1",
        description: "5kg per dig",
        icon: "up-arrow.png",
        cost: 200,
        tgt_bldg: "dig",
        multp: 5
    },
    "dig2":{
        name: "Generator Upgrade 2",
        description: "100kg per dig",
        icon: "up-arrow.png",
        cost: 120000,
        tgt_bldg: "dig",
        multp: 100
    },
    "dig3":{
        name: "Generator Upgrade 3",
        description: "500kg per dig",
        icon: "up-arrow.png",
        cost: 400000,
        tgt_bldg: "dig",
        multp: 500
    },
    "dig4":{
        name: "Generator Upgrade 4",
        description: "10000kg per dig",
        icon: "up-arrow.png",
        cost: 300000,
        tgt_bldg: "dig",
        multp: 10000
    },
    "dig4":{
        name: "Generator Upgrade 4",
        description: "10000kg per dig",
        icon: "up-arrow.png",
        cost: 300000,
        tgt_bldg: "dig",
        multp: 10000
    },
    "biof1":{
        name: "First-generation biofuels",
        description: "Biofuel Plant x2",
        icon: "up-arrow.png",
        cost: 0,
        tgt_bldg: "1_biof",
        multp: 2
    },
    "biof2":{
        name: "Second-generation biofuels",
        description: "Biofuel Plant x3",
        icon: "up-arrow.png",
        cost: 0,
        tgt_bldg: "1_biof",
        multp: 3
    },
    "biof3":{
        name: "Third-generation biofuels",
        description: "Biofuel Plant x4",
        icon: "up-arrow.png",
        cost: 0,
        tgt_bldg: "1_biof",
        multp: 4
    },
    "coal1":{
        name: "Coal Station",
        description: "Fossil-fuel Power Plant x2",
        icon: "up-arrow.png",
        cost: 0,
        tgt_bldg: "2_coal",
        multp: 2
    },
    "coal2":{
        name: "Natural Gas Station",
        description: "Fossil-fuel Power Plant x3",
        icon: "up-arrow.png",
        cost: 0,
        tgt_bldg: "2_coal",
        multp: 3
    },
    "coal3":{
        name: "Petroleum Station",
        description: "Fossil-fuel Power Plant x4",
        icon: "up-arrow.png",
        cost: 0,
        tgt_bldg: "2_coal",
        multp: 4
    },
    "sun1":{
        name: "Fixed Arrays",
        description: "Photovoltaic Station x2",
        icon: "up-arrow.png",
        cost: 0,
        tgt_bldg: "3_sun",
        multp: 2
    },
    "sun2":{
        name: "Single-axis Arrays",
        description: "Photovoltaic Station x3",
        icon: "up-arrow.png",
        cost: 0,
        tgt_bldg: "3_sun",
        multp: 3
    },
    "sun3":{
        name: "Dual-axis Arrays",
        description: "Photovoltaic Station x4",
        icon: "up-arrow.png",
        cost: 0,
        tgt_bldg: "3_sun",
        multp: 4
    },
    "wind1":{
        name: "Vertical-axis Blades",
        description: "Wind Farm x2",
        icon: "up-arrow.png",
        cost: 0,
        tgt_bldg: "4_wind",
        multp: 2
    },
    "wind2":{
        name: "Horioztontal-axis Blades",
        description: "Photovoltaic Station x3",
        icon: "up-arrow.png",
        cost: 0,
        tgt_bldg: "4_wind",
        multp: 3
    },
    "wind3":{
        name: "Darrieus Blades",
        description: "Photovoltaic Station x4",
        icon: "up-arrow.png",
        cost: 0,
        tgt_bldg: "4_wind",
        multp: 4
    },
    "water1":{
        name: "Stainless Blade",
        description: "Hydroelectric Dam x2",
        icon: "up-arrow.png",
        cost: 0,
        tgt_bldg: "5_water",
        multp: 2
    },
    "water2":{
        name: "Nikel Blade",
        description: "Hydroelectric Dam x3",
        icon: "up-arrow.png",
        cost: 0,
        tgt_bldg: "5_water",
        multp: 3
    },
    "water3":{
        name: "Titanium Blade",
        description: "Hydroelectric Dam x4",
        icon: "up-arrow.png",
        cost: 0,
        tgt_bldg: "5_water",
        multp: 4
    },          
    "oil1":{
        name: "Sub-sea Platform",
        description: "Offshore Rig x2",
        icon: "up-arrow.png",
        cost: 0,
        tgt_bldg: "6_oil",
        multp: 2
    },
    "oil2":{
        name: "Fixed Platform",
        description: "Offshore Rig x3",
        icon: "up-arrow.png",
        cost: 0,
        tgt_bldg: "6_oil",
        multp: 3
    },
    "oil3":{
        name: "Semi-submersibles Platform",
        description: "Offshore Rig x4",
        icon: "up-arrow.png",
        cost: 0,
        tgt_bldg: "6_oil",
        multp: 4
    },
    "thermal1":{
        name: "Dry Steam",
        description: "Geothermal Plant x2",
        icon: "up-arrow.png",
        cost: 0,
        tgt_bldg: "7_thermal",
        multp: 2
    },
    "thermal2":{
        name: "Flash Stream",
        description: "Geothermal Plant x3",
        icon: "up-arrow.png",
        cost: 0,
        tgt_bldg: "7_thermal",
        multp: 3
    },
    "thermal3":{
        name: "Binary Cycle",
        description: "Geothermal Plant x4",
        icon: "up-arrow.png",
        cost: 0,
        tgt_bldg: "7_thermal",
        multp: 4
    },
    "nuke1":{
        name: "Pu-239 Reactor",
        description: "Nuclear Power x2",
        icon: "up-arrow.png",
        cost: 0,
        tgt_bldg: "8_nuke",
        multp: 2
    },
    "nuke2":{
        name: "U-235 Reactor",
        description: "Nuclear Power x3",
        icon: "up-arrow.png",
        cost: 0,
        tgt_bldg: "8_nuke",
        multp: 3
    },
    "nuke3":{
        name: "Th-232 Reactor",
        description: "Nuclear Power x4",
        icon: "up-arrow.png",
        cost: 0,
        tgt_bldg: "8_nuke",
        multp: 4
    }
}