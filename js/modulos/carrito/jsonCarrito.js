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
    actividades: [
            {
              activity: {
                id: 65,
                title: 'Contrastes de Nueva York',
                providerId: 131,
                categories: [
                  {
                    id: 1,
                    description: 'Visitas guiadas y free tours'
                  }
                ]
              },
              date: '2025-03-14',
              details: {
                MinimumPaxPerBooking: null,
                accessibility: {
                  code: 121,
                  description: 'Sí, solo para sillas de ruedas plegables de pequeñas dimensiones'
                },
                address: {
                    latitude: 40.754373895559,
                    longitude: -73.9927084408204,
                    shortAddress: 'Hotel Courtyard New York Manhattan/Times Square West.',
                    zoom: 16
                },
                advance: {
                    days: 0,
                    hour: null,
                    minutes_before: 600
                },
                amountType: 'PVP',
                cancelPolicies: [
                    {
                    hours: 24,
                    penalty: 0,
                    type: 'percent'
                    }
                ],
                cancelPolicy: '¡Gratis! Cancela sin gastos hasta 24 horas antes de la actividad. Si cancelas con menos tiempo, llegas tarde o no te presentas, no se ofrecerá ningún reembolso.',
                category: {
                    id: 1,
                    description: 'Visitas guiadas y free tours'
                },
                currency: 'USD',
                description: '<strong>Contrastes de Nueva York</strong> es la excursión más popular de la ciudad que nunca duerme y en ella conoceremos los <b>barrios de Queens,&nbsp;</b><strong>el Bronx y Brooklyn</strong>.',
                destinationId: 8,
                duration: {
                    min: 240,
                    max: 0,
                    duration: 240
                },
                guideLanguages: ['es'],
                hasAdditionalQuestions: false,
                hasDynamicPrice: false,
                hasPassengersQuestions: false,
                id: 65,
                included: [
                    'Transporte en autobús.',
                    'Guía de habla española.'
                ],
                infoVoucher: "<p><strong>15 minutos antes</strong> de la hora indicada, debéis presentaros en el siguiente punto de Nueva York: <strong>entrada del Hotel Courtyard New York Manhattan/Times Square West</strong>, situado en el<strong>&nbsp;número&nbsp;307 de la calle West 37th Street</strong>. Se ruega puntualidad.</p>",
                isCategoryPaxGroup: false,
                isFreeTour: false,
                lang: 'es',
                longDescription: "<p><strong>Contrastes de Nueva York</strong> es una excursión que abarca los barrios más significativos de la ciudad: <strong>el Bronx, Queens y Brooklyn</strong>. Durante 4 horas, se exploran las áreas de mayor diversidad cultural, accesibles principalmente mediante un tour guiado.</p>\n\n<h2>Itinerario</h2>\n\n<p>A la hora fijada, nos encontraremos en el <b>Hotel Courtyard New York Manhattan/Times Square West</b> para comenzar el <b>tour de contrastes</b>. Iniciaremos en el <strong>oeste de Manhattan</strong>, donde se podrán observar el <strong>portaaviones Intrepid</strong> y el complejo de edificios Trump, así como las vistas del río Hudson.</p>\n\n<p>La primera parada será en <strong>el Bronx</strong>, conocido como el <strong>distrito de la salsa</strong> y cuna de <strong>Jennifer López</strong>. Visitarán el <strong>Estadio de los Yankees</strong>, el <strong>Palacio de Justicia</strong>, los juzgados y la Corte Criminal del Bronx. También se verá la exterior de la Comisaría 32, la <strong>Avenida Grand Concord</strong> y el <strong>South Bronx</strong>, famoso por sus grafitis.</p>\n\n<p>Continuaremos hacia <strong>Queens</strong>, el distrito más extenso y multicultural de Nueva York. Atravesaremos el <strong>puente Whitestone</strong> y visitaremos la zona de <strong>Malba</strong> y <strong>Flushing Meadows Corona Park</strong>, donde se encuentran el <strong>Estadio de los Mets</strong> y el globo terráqueo <strong>Unisphere</strong>.</p>\n\n<p>Tras dejar Queens, llegaremos a <strong>Brooklyn</strong>, donde recorreremos el <strong>barrio judío de Williamsburg</strong>, notable por su comunidad judía ortodoxa. El tour culminará tras <strong>4 horas</strong>, ofreciendo dos opciones al final:</p>\n\n<ul class=\"listado\">\n\t<li><b>Quedar en Brooklyn</b> y cruzar el <b>puente sobre el río Este</b>.</li>\n\t<li><b>Continuar a Mulberry Street en Chinatown</b>, con acceso a <b>Little Italy, SoHo o Greenwich Village</b>.</li>\n</ul>\n\n<h2>Tour de contrastes VIP</h2>\n\n<p>Se puede optar por el <strong>tour de contrastes VIP</strong>, que incluye <strong>recogida en hoteles de Manhattan</strong> y una parada adicional. Existe también la opción de contratar un <strong>tour privado de contrastes de Nueva York</strong> para mayor comodidad.</p>",
                maximumPaxPerActivity: null,
                minAge: 0,
                minimumPaxPerActivity: 0,
                minimumPrice: 49,
                notIncluded: [],
                originalPrice: 49,
                photos: {
                    gallery: [
                    {
                        caption: "Puente de Brooklyn",
                        paths: {
                        big: "https://f.civitatis.com/estados-unidos/nueva-york/galeria/big/vista-brooklyn-bridge.jpg",
                        original: "https://f.civitatis.com/estados-unidos/nueva-york/galeria/vista-brooklyn-bridge.jpg",
                        thumbnail: "https://f.civitatis.com/estados-unidos/nueva-york/galeria/thumbs/vista-brooklyn-bridge.jpg"
                        }
                    }
                    ],
                    header: [
                    {
                        caption: "Contrastes de Nueva York",
                        paths: {
                        grid: "https://f.civitatis.com/estados-unidos/nueva-york/contrastes-nueva-york-grid.jpg",
                        list: "https://f.civitatis.com/estados-unidos/nueva-york/contrastes-nueva-york-list.jpg",
                        list_responsive: "https://f.civitatis.com/estados-unidos/nueva-york/contrastes-nueva-york-list-m.jpg",
                        original: "https://f.civitatis.com/estados-unidos/nueva-york/contrastes-nueva-york.jpg",
                        thumbnail: "https://f.civitatis.com/estados-unidos/nueva-york/contrastes-nueva-york-m.jpg"
                        }
                    }
                    ]
                },
                rates: [{}],
                rawLongDescription: "Contrastes de Nueva York es una excursión que abarca los barrios más significativos de la ciudad: el Bronx, Queens y Brooklyn. Durante 4 horas, se exploran las áreas de mayor diversidad cultural, accesibles principalmente mediante un tour guiado.\n\nItinerario\n\nA la hora fijada, nos encontraremos en el Hotel Courtyard New York Manhattan/Times Square West para comenzar el tour de contrastes. Iniciaremos en el oeste de Manhattan, donde se podrán observar el portaaviones Intrepid y el complejo de edificios Trump, así como las vistas del río Hudson.\n\nLa primera parada será en el Bronx, conocido como el distrito de la salsa y cuna de Jennifer López. Visitarán el Estadio de los Yankees, el Palacio de Justicia, los juzgados y la Corte Criminal del Bronx. También se verá la exterior de la Comisaría 32, la Avenida Grand Concord y el South Bronx, famoso por sus grafitis.\n\nContinuaremos hacia Queens, el distrito más extenso y multicultural de Nueva York. Atravesaremos el puente Whitestone y visitaremos la zona de Malba y Flushing Meadows Corona Park, donde se encuentran el Estadio de los Mets y el globo terráqueo Unisphere.\n\nTras dejar Queens, llegaremos a Brooklyn, donde recorreremos el barrio judío de Williamsburg, notable por su comunidad judía ortodoxa. El tour culminará tras 4 horas, ofreciendo dos opciones al final:\n\n\n\tQuedar en Brooklyn y cruzar el puente sobre el río Este.\n\tContinuar a Mulberry Street en Chinatown, con acceso a Little Italy, SoHo o Greenwich Village.\n\n\nTour de contrastes VIP\n\nSe puede optar por el tour de contrastes VIP, que incluye recogida en hoteles de Manhattan y una parada adicional. Existe también la opción de contratar un tour privado de contrastes de Nueva York para mayor comodidad.",
                raw_description: "Contrastes de Nueva York es la excursión más popular de la ciudad que nunca duerme y en ella conoceremos los barrios de Queens,&nbsp;el Bronx y Brooklyn.",
                relatedActivities: [{}, {}, {}, {}],
                reviews: 26581,
                score: 9.1,
                secondaryDestinationId: [],
                subcategory: {
                    id: 3,
                    description: 'Tour en vehículo'
                },
                title: "Contrastes de Nueva York",
                type: 1,
                typologies: [{}],
                url: "https://www.civitatis.com/es/nueva-york/contrastes-nueva-york",
                voucherType: 0
            },
            rate: 
                {
                id: 0,
                rate: "Tour en español",
                categories: [
                    {
                        id: 0,
                        category: "Adultos",
                        amountType: "PVP",
                        price: 49,
                        quantity: 1,
                        totalPrice: 49
                    }
                ]
            },
            itemId:"67d31490af2d78.05489228"
        }
    ],
    tranfer: [
        {
            date: "2025-03-21",
            itemId: "67d33d89aaaa20.13078497",
            rate: {
              id: 0,
              rate: null,
              categories: [
                {
                  id: 0,
                  category: "private",
                  amountType: "PVP",
                  price: 167.23,
                  quantity: 2,
                  totalPrice: 167.23
                }
              ]
            },
            time: "12:10",
            transfer: {
              cityId: "27",
              fromZone: "94",
              fromZoneName: "Miami Airport",
              providerId: 206,
              toZone: "95",
              toZoneName: "Miami (all areas)",
              vehicleId: "107"
            },
            vehiculo: {
              id: 107,
              label: "Minibús de 11 plazas",
              image: "https://f.civitatis.com/imagenes/traslados/700x327/bus.jpg",
              places: 11,
              hand_suitcase: 6,
              large_suitcase: 11,
              cancellation: 24,
              advance: 24,
              babyChair: {
                availability: "to_12_years",
                required: 1,
                supplement: 10,
                weight: null,
                weightMin: 0,
                years: 5,
                yearsMin: 0
              },
              prices: {
                ARS: 188051.3,
                BRL: 1033.2,
                CLP: 165682.1,
                COP: 729661.1,
                EUR: 153.5,
                GBP: 128.9,
                MXN: 3560.6,
                PEN: 646.4,
                USD: 167.23
              },
              amountType: "PVP"
            },
            supplements: [
              {
                amount: 20,
                start: "00:00",
                end: "06:59",
                kind: "amount",
                label: "night"
              },
              {
                amount: 20,
                start: "22:00",
                end: "23:59",
                kind: "amount",
                label: "night"
              }
            ],
            type: "private",
            zone: {
              from: 94,
              to: 95
            }
          }
    ]
    
};
