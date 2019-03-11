buildings = {
    "1_drone":{
        name: "Mining Drone",
        description: "",
        icon: "unmanned-aerial-vehicle.png",
        base_cost: 20,
        base_speed: 1
    },
    "2_excavator":{
        name: "Excavator",
        description: "",
        icon: "satellite-dish.png",
        base_cost: 100,
        base_speed: 4
    },
    "3_boring":{
        name: "Boring Plant",
        description: "A vertical boring plant lander. Just boring as that.",
        icon: "satellite-dish.png",
        base_cost: 700,
        base_speed: 8
    },
    "4_seismic":{
        name: "Seismast",
        description: "Break down the rocks using artificial earthquake.",
        icon: "satellite-dish.png",
        base_cost: 14000,
        base_speed: 50
    },
    "5_rods":{
        name: "God's Rods",
        description: "",
        icon: "satellite-dish.png",
        base_cost: 300000,
        base_speed: 200
    },
    "6_laser":{
        name: "LASER",
        description: "Light Assisted Self-Excavating Rig",
        icon: "satellite-dish.png",
        base_cost: 500000,
        base_speed: 1500
    },
    "7_":{
        name: "7",
        description: "",
        icon: "satellite-dish.png",
        base_cost: 50000000,
        base_speed: 8000
    },
    "8_":{
        name: "8",
        description: "",
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
    "dig1":{
        name: "Dig Upgrade 2",
        description: "100kg per dig",
        icon: "satellite-dish.png",
        cost: 120000,
        tgt_bldg: "dig",
        multp: 100
    },
    "dig1":{
        name: "Dig Upgrade 3",
        description: "500kg per dig",
        icon: "satellite-dish.png",
        cost: 400000,
        tgt_bldg: "dig",
        multp: 500
    },
    "dig1":{
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