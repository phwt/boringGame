buildings = {
    "1_biof":{
        name: "Biofuel Plant",
        description: "Power from the living matter",
        icon: "unmanned-aerial-vehicle.png",
        base_cost: 20,
        base_speed: 1
    },
    "2_coal":{
        name: "Fossil-fuel Power Plant",
        description: "Burn a thing leftover by our predecessor",
        icon: "satellite-dish.png",
        base_cost: 100,
        base_speed: 4
    },
    "3_sun":{
        name: "Photovoltaic Station",
        description: "Travels many millions miles to power us...and melts our chocolate",
        icon: "satellite-dish.png",
        base_cost: 700,
        base_speed: 8
    },
    "4_wind":{
        name: "Wind Farm",
        description: "Make a use of a whirlwind",
        icon: "satellite-dish.png",
        base_cost: 14000,
        base_speed: 50
    },
    "5_water":{
        name: "Hydroelectric Dam",
        description: "Let the current and gravity do the job",
        icon: "satellite-dish.png",
        base_cost: 300000,
        base_speed: 200
    },
    "6_oil":{
        name: "Offshore Rig",
        description: "Excavate raw energy from the middle of the ocean",
        icon: "satellite-dish.png",
        base_cost: 500000,
        base_speed: 1500
    },
    "7_thermal":{
        name: "Geothermal Plant",
        description: "Earth powering the earth",
        icon: "satellite-dish.png",
        base_cost: 50000000,
        base_speed: 8000
    },
    "8_nuke":{
        name: "Nuclaer Power Station",
        description: "From a weapon of mass destruction to long-lasting clean enegy",
        icon: "satellite-dish.png",
        base_cost: 120000000,
        base_speed: 40000
    }
}

upgrades = {
    "dig1":{
        name: "Dig Upgrade 1",
        description: "5kg per dig",
        icon: "satellite-dish.png",
        cost: 200,
        tgt_bldg: "dig",
        multp: 5
    },
    "dig2":{
        name: "Dig Upgrade 2",
        description: "100kg per dig",
        icon: "satellite-dish.png",
        cost: 120000,
        tgt_bldg: "dig",
        multp: 100
    },
    "dig3":{
        name: "Dig Upgrade 3",
        description: "500kg per dig",
        icon: "satellite-dish.png",
        cost: 400000,
        tgt_bldg: "dig",
        multp: 500
    },
    "dig4":{
        name: "Dig Upgrade 4",
        description: "10000kg per dig",
        icon: "satellite-dish.png",
        cost: 300000,
        tgt_bldg: "dig",
        multp: 10000
    },
    "drone1":{
        name: "Drone Upgrade 1",
        description: "Drone x2",
        icon: "satellite-dish.png",
        cost: 0,
        tgt_bldg: "1_drone",
        multp: 2
    }
}