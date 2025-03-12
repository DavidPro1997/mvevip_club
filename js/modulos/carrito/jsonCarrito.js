var jsonCarritoEjemplo = {
    vuelos : [
        {
            account_codes_used: [],
            fare_type: "PNEG",
            flight_type: "ROUND_TRIP",
            last_ticketing_date: "2025-03-13T19:58:00-05:00",
            original_search: "?adults=2&children=0&dates=2025-05-16,2025-05-18&destination=CTG&handicapped=0&infants=0&origin=UIO&seniors=0&type=ROUND_TRIP&type=ROUND_TRIP",
            payments_url: "https://www.pagos593.com/payments/{id}?brand=marketing-vip&producto={product_id}",
            price: {
                adults: {
                    exchange_policy: [],
                    fare: 200,
                    quantity: 2,
                    refund_policy: [],
                    taxes: []
                },
                agency_charges: {
                    fees: 20,
                    markup: 0,
                    operating_cost: 0
                },
                agency_cost_effectiveness: 20,
                charges: 31.5,
                commision_rule_data: {
                    ceded_amount: 0,
                    currency: "USD",
                    reseller_amount: 2
                },
                currency: "USD",
                detail: {
                    charges: 31.5,
                    fees: []
                },
                fees: [],
                reseller_charges: {
                    fees: 11.5,
                    markup: 0,
                    operating_cost: 0
                },
                taxes: 341.14,
                total: 572.64
            },
            provider_id: "NETVIAX",
            route_type: "INTERNATIONAL",
            segments: [
                {
                    departure_date: "2025-05-16",
                    origin: {
                        code: "UIO",
                        name: "Quito, Ecuador (UIO-A. Internacional Mariscal Sucre)",
                        country_code: "EC"
                    },
                    destination: {
                        code: "CTG",
                        name: "Cartagena, Colombia (CTG-A. Internacional Rafael Núñez)",
                        country_code: "CO"
                    },
                    options: [
                        {
                            arrival_date: "2025-05-16",
                            arrival_time: "07:14",
                            departure_time: "02:30",
                            duration: "04:44",
                            id: "861f98f2-8266-44d4-92d8-4272f712cd48|8728211567635687761",
                            baggage_allowances: [
                                { chargeable: false, quantity: 0, type: "CHECKED_BAGGAGE", weight: 0 },
                                { chargeable: false, quantity: 1, type: "PERSONAL_ITEM", weight: 0 }
                            ],
                            legs: [
                                {
                                    aircraft_type: "Airbus A320-100/200",
                                    arrival_date: "2025-05-16",
                                    arrival_time: "04:00",
                                    brand: {
                                        id: "BASIC",
                                        name: "BASIC"
                                    },
                                    cabin_type: {
                                        code: "U",
                                        name: "Economy",
                                        quantity: 9
                                    },
                                    departure_date: "2025-05-16",
                                    departure_time: "02:30",
                                    destination: {
                                        code: "BOG",
                                        name: "Bogotá, Colombia (BOG-A. Internacional El Dorado)",
                                        country_code: "CO"
                                    },
                                    duration: "01:30",
                                    fare_type: "NEG",
                                    flight_number: "8390",
                                    id: "",
                                    marketing_carrier: {
                                        code: "AV",
                                        name: "Avianca"
                                    },
                                    operating_carrier: {
                                        code: "2K",
                                        name: "AVIANCA-Ecuador dba AVIANCA"
                                    },
                                    origin: {
                                        code: "UIO",
                                        name: "Quito, Ecuador (UIO-A. Internacional Mariscal Sucre)",
                                        country_code: "EC"
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    departure_date: "2025-05-18",
                    origin: {
                        code: "CTG",
                        name: "Cartagena, Colombia (CTG-A. Internacional Rafael Núñez)",
                        country_code: "CO"
                    },
                    destination: {
                        code: "UIO",
                        name: "Quito, Ecuador (UIO-A. Internacional Mariscal Sucre)",
                        country_code: "EC"
                    },
                    options: [
                        {
                            arrival_date: "2025-05-16",
                            arrival_time: "07:14",
                            departure_time: "02:30",
                            duration: "04:44",
                            id: "861f98f2-8266-44d4-92d8-4272f712cd48|8728211567635687761",
                            baggage_allowances: [
                                { chargeable: false, quantity: 0, type: "CHECKED_BAGGAGE", weight: 0 },
                                { chargeable: false, quantity: 1, type: "PERSONAL_ITEM", weight: 0 }
                            ],
                            legs: [
                                {
                                    aircraft_type: "Airbus A320-100/200",
                                    arrival_date: "2025-05-16",
                                    arrival_time: "04:00",
                                    brand: {
                                        id: "BASIC",
                                        name: "BASIC"
                                    },
                                    cabin_type: {
                                        code: "U",
                                        name: "Economy",
                                        quantity: 9
                                    },
                                    departure_date: "2025-05-16",
                                    departure_time: "02:30",
                                    destination: {
                                        code: "BOG",
                                        name: "Bogotá, Colombia (BOG-A. Internacional El Dorado)",
                                        country_code: "CO"
                                    },
                                    duration: "01:30",
                                    fare_type: "NEG",
                                    flight_number: "8390",
                                    id: "",
                                    marketing_carrier: {
                                        code: "AV",
                                        name: "Avianca"
                                    },
                                    operating_carrier: {
                                        code: "2K",
                                        name: "AVIANCA-Ecuador dba AVIANCA"
                                    },
                                    origin: {
                                        code: "UIO",
                                        name: "Quito, Ecuador (UIO-A. Internacional Mariscal Sucre)",
                                        country_code: "EC"
                                    }
                                }
                            ]
                        }
                    ]
                }
            ],
            source: "AMNDC",
            source_type: "NDC",
            tracking_id: "7e0ce34e-2c8e-4803-a248-5a9f713771f0",
            upsell: false,
            validating_carrier: {
                code: "2K",
                name: "AVIANCA-Ecuador dba AVIANCA"
            }
        }
    ],
    hoteles: [
        {
            hotel: {
                name: "Almirante Cartagena",
                address: "Avenue San Martín",
                categoryCode: "5EST",
                categoryName: "5 STARS",
                checkIn: "2025-05-16",
                checkOut: "2025-05-18",
                code: 162425,
                currency: "USD",
                description: "Ubicado en la principal zona turística y comercial de la Cartagena moderna...",
                destinationCode: "CTG",
                destinationName: "Cartagena",
                latitude: "10.40028860000000000000",
                longitude: "-75.55834700000000000000",
                modificationPolicies: { cancellation: true, modification: false },
                paymentDataRequired: true,
                facilities: [
                    { name: "Piscina" },
                    { name: "Gimnasio" },
                    { name: "Wi-Fi" },
                    { name: "Estacionamiento" }
                ],
                images: [
                    [
                        "http://photos.hotelbeds.com/giata/16/162425/162425a_hb_a_023.jpg",
                        "http://photos.hotelbeds.com/giata/small/16/162425/162425a_hb_a_023.jpg"
                    ],
                    [
                        "http://photos.hotelbeds.com/giata/16/162425/162425a_hb_a_024.jpeg",
                        "http://photos.hotelbeds.com/giata/small/16/162425/162425a_hb_a_024.jpeg"
                    ]
                ],
                phones: [
                    { type: "Reception", number: "+57 123 456789" },
                    { type: "Reservations", number: "+57 987 654321" }
                ],
                rooms: [
                    {
                        characteristicDescription: "EXECUTIVE",
                        code: "TWN.EJ-1",
                        name: "TWIN EXECUTIVE",
                        description: "HABITACIÓN 2 CAMAS EXECUTIVE",
                        typeDescription: "HABITACIÓN 2 CAMAS",
                        rates: [
                            {
                                adults: 2,
                                allotment: 3,
                                boardCode: "FB",
                                boardName: "FULL BOARD",
                                cancellationPolicies: [
                                    {
                                        amount: "120.45",
                                        from: "2025-05-11T01:59:00-05:00"
                                    },
                                    {
                                        amount: "602.27",
                                        from: "2025-05-13T01:59:00-05:00"
                                    }
                                ],
                                children: 0,
                                net: "602.27",
                                packaging: false,
                                paymentType: "AT_WEB",
                                rateClass: "NOR",
                                rateComments: `Estimated total amount of taxes & fees for this booking: 19.00% payable on arrival.
                                Check-in hour 15:00-12:00. Car park YES (With additional debit notes). Identification card at arrival. Deposit on arrival.
                                From date 5/16/2025 12:00:00 AM to 5/18/2025 12:00:00 AM: Colombian nationals are subject to local taxes payable upon check-in.
                                Exemptions on tax apply only to non-nationals providing PIP5, PTP-5, or TP-11 touristic entry stamps on their passport.
                                Anyone entering on a different stamp is also subject to local taxes payable directly at the hotel.
                                Please contact our Call Centre if you require further information.
                                ...
                                Check-in time at the hotel is from 3:00 p.m. The check-out time of the hotel is at 12:00 p.m.
                                Maximum accommodation allowed: 2 adults + 2 children or 3 adults.
                                For minors under 18, a civil registry and identity card are required.
                                Smoking inside the rooms and entry of pets are prohibited.
                                For reservations of 5 or more rooms, special conditions or supplements may apply.`,
                                rateKey: "20250516|20250518|W|296|162425|TWN.EJ-1|ID_B2B_88|FB|B2BUSUS|1~2~0||N@07~A-SIC~21b25a~-1761046117~N~~~NOR~~99C70FF345ED459174181415177905AAEC0134011900130821b25a",
                                rateType: "BOOKABLE",
                                rooms: 1,
                                taxes: {
                                    taxes: [
                                        {
                                            amount: "19.00%",
                                            description: "Payable on arrival"
                                        }
                                    ],
                                    allIncluded: false
                                }
                            }
                        ]
                    }
                ]
            },
            ocupantes: [
                {
                    adults: 2,
                    children: 0,
                    paxes: [],
                    ratekey: "20250516|20250518|W|296|162425|TWN.EJ-1|ID_B2B_88|FB|B2BUSUS|1~2~0||N@07~A-SIC~21b25a~-1761046117~N~~~NOR~~99C70FF345ED459174181415177905AAEC0134011900130821b25a",
                    rooms: 1
                }
            ]
        },
        {
            hotel: {
                name: "Almirante Cartagena",
                address: "Avenue San Martín",
                categoryCode: "5EST",
                categoryName: "5 STARS",
                checkIn: "2025-05-16",
                checkOut: "2025-05-18",
                code: 162425,
                currency: "USD",
                description: "Ubicado en la principal zona turística y comercial de la Cartagena moderna...",
                destinationCode: "CTG",
                destinationName: "Cartagena",
                latitude: "10.40028860000000000000",
                longitude: "-75.55834700000000000000",
                modificationPolicies: { cancellation: true, modification: false },
                paymentDataRequired: true,
                facilities: [
                    { name: "Piscina" },
                    { name: "Gimnasio" },
                    { name: "Wi-Fi" },
                    { name: "Estacionamiento" }
                ],
                images: [
                    [
                        "http://photos.hotelbeds.com/giata/16/162425/162425a_hb_a_023.jpg",
                        "http://photos.hotelbeds.com/giata/small/16/162425/162425a_hb_a_023.jpg"
                    ],
                    [
                        "http://photos.hotelbeds.com/giata/16/162425/162425a_hb_a_024.jpeg",
                        "http://photos.hotelbeds.com/giata/small/16/162425/162425a_hb_a_024.jpeg"
                    ]
                ],
                phones: [
                    { type: "Reception", number: "+57 123 456789" },
                    { type: "Reservations", number: "+57 987 654321" }
                ],
                rooms: [
                    {
                        characteristicDescription: "EXECUTIVE",
                        code: "TWN.EJ-1",
                        name: "TWIN EXECUTIVE",
                        description: "HABITACIÓN 2 CAMAS EXECUTIVE",
                        typeDescription: "HABITACIÓN 2 CAMAS",
                        rates: [
                            {
                                adults: 2,
                                allotment: 3,
                                boardCode: "FB",
                                boardName: "FULL BOARD",
                                cancellationPolicies: [
                                    {
                                        amount: "120.45",
                                        from: "2025-05-11T01:59:00-05:00"
                                    },
                                    {
                                        amount: "602.27",
                                        from: "2025-05-13T01:59:00-05:00"
                                    }
                                ],
                                children: 0,
                                net: "602.27",
                                packaging: false,
                                paymentType: "AT_WEB",
                                rateClass: "NOR",
                                rateComments: `Estimated total amount of taxes & fees for this booking: 19.00% payable on arrival.
                                Check-in hour 15:00-12:00. Car park YES (With additional debit notes). Identification card at arrival. Deposit on arrival.
                                From date 5/16/2025 12:00:00 AM to 5/18/2025 12:00:00 AM: Colombian nationals are subject to local taxes payable upon check-in.
                                Exemptions on tax apply only to non-nationals providing PIP5, PTP-5, or TP-11 touristic entry stamps on their passport.
                                Anyone entering on a different stamp is also subject to local taxes payable directly at the hotel.
                                Please contact our Call Centre if you require further information.
                                ...
                                Check-in time at the hotel is from 3:00 p.m. The check-out time of the hotel is at 12:00 p.m.
                                Maximum accommodation allowed: 2 adults + 2 children or 3 adults.
                                For minors under 18, a civil registry and identity card are required.
                                Smoking inside the rooms and entry of pets are prohibited.
                                For reservations of 5 or more rooms, special conditions or supplements may apply.`,
                                rateKey: "20250516|20250518|W|296|162425|TWN.EJ-1|ID_B2B_88|FB|B2BUSUS|1~2~0||N@07~A-SIC~21b25a~-1761046117~N~~~NOR~~99C70FF345ED459174181415177905AAEC0134011900130821b25a",
                                rateType: "BOOKABLE",
                                rooms: 1,
                                taxes: {
                                    taxes: [
                                        {
                                            amount: "19.00%",
                                            description: "Payable on arrival"
                                        }
                                    ],
                                    allIncluded: false
                                }
                            }
                        ]
                    }
                ]
            },
            ocupantes: [
                {
                    adults: 2,
                    children: 0,
                    paxes: [],
                    ratekey: "20250516|20250518|W|296|162425|TWN.EJ-1|ID_B2B_88|FB|B2BUSUS|1~2~0||N@07~A-SIC~21b25a~-1761046117~N~~~NOR~~99C70FF345ED459174181415177905AAEC0134011900130821b25a",
                    rooms: 1
                }
            ]
        }

    ],
    actividades: [],
    tranfer: [],
    precios: [],
    
};
