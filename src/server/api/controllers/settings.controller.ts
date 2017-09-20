import { Get, JsonController, QueryParam } from 'routing-controllers'
 // tslint:disable:max-line-length
@JsonController()
export class SettingsController {

  @Get('/settings')
  get(@QueryParam('test') test: number) {
    console.log(test)
    return Promise.resolve([
      {
        '_id': '59c1f8c33d81f1f4a077eb03',
        'index': 0,
        'guid': '6d62855c-dfe7-4a7b-a512-f01e7325e038',
        'isActive': true,
        'balance': '$3,728.45',
        'picture': 'http://placehold.it/32x32',
        'age': 21,
        'eyeColor': 'blue',
        'name': 'Catherineasdasdasd Blackburn',
        'gender': 'female',
        'company': 'QUIZMO',
        'email': 'catherineblackburn@quizmo.com',
        'phone': '+1 (827) 567-2769',
        'address': '332 Ocean Parkway, Nanafalia, Alabama, 7875',
        'about': 'Sunt Lorem elit adipisicing amet consectetur ullamco culpa irure mollit pariatur minim consectetur veniam irure. Pariatur duis culpa enim tempor. Deserunt reprehenderit dolor id officia mollit proident consectetur non. Consectetur mollit incididunt nisi reprehenderit labore id enim culpa sint laborum ea veniam. Labore ea velit fugiat ad consequat. Minim ad anim amet occaecat cupidatat aliqua nisi sit nulla pariatur.\r\n',
        'registered': '2015-12-24T04:20:51 +06:00',
        'latitude': -62.867646,
        'longitude': 160.566927,
        'tags': [
          'ut',
          'nostrud',
          'enim',
          'reprehenderit',
          'eu',
          'aliquip',
          'et'
        ],
        'friends': [
          {
            'id': 0,
            'name': 'Maggie Frye'
          },
          {
            'id': 1,
            'name': 'Shepherd Carpenter'
          },
          {
            'id': 2,
            'name': 'Jefferson Travis'
          }
        ],
        'greeting': 'Hello, Catherine Blackburn! You have 10 unread messages.',
        'favoriteFruit': 'strawberry'
      },
      {
        '_id': '59c1f8c3b8cf1d7f9d8e6264',
        'index': 1,
        'guid': '2e7bfd3d-eb14-47fd-886b-3c78b8ddda90',
        'isActive': true,
        'balance': '$1,272.57',
        'picture': 'http://placehold.it/32x32',
        'age': 21,
        'eyeColor': 'green',
        'name': 'Murray Rowe',
        'gender': 'male',
        'company': 'MALATHION',
        'email': 'murrayrowe@malathion.com',
        'phone': '+1 (980) 521-2421',
        'address': '557 Cobek Court, Faywood, American Samoa, 8967',
        'about': 'Voluptate eiusmod sunt aute duis aute culpa culpa adipisicing reprehenderit sint nisi consectetur sunt. Reprehenderit sunt reprehenderit ea non eiusmod quis veniam velit fugiat aliqua officia ipsum veniam ullamco. Excepteur anim aliquip sit excepteur proident nulla exercitation. In ex occaecat ea aliquip proident sint culpa sunt elit. Nostrud esse aliqua exercitation in proident enim mollit. Do incididunt irure Lorem occaecat. Aliqua cupidatat eu sit in pariatur pariatur laborum Lorem exercitation deserunt.\r\n',
        'registered': '2014-10-23T07:40:58 +05:00',
        'latitude': 44.632918,
        'longitude': 72.177334,
        'tags': [
          'pariatur',
          'ipsum',
          'sunt',
          'sunt',
          'ipsum',
          'incididunt',
          'elit'
        ],
        'friends': [
          {
            'id': 0,
            'name': 'Gilliam Bond'
          },
          {
            'id': 1,
            'name': 'Amanda Trujillo'
          },
          {
            'id': 2,
            'name': 'Earnestine Skinner'
          }
        ],
        'greeting': 'Hello, Murray Rowe! You have 4 unread messages.',
        'favoriteFruit': 'apple'
      },
      {
        '_id': '59c1f8c3a5eceb26d4805382',
        'index': 2,
        'guid': 'e9c7ad88-de51-41b3-bade-50408a2f3497',
        'isActive': true,
        'balance': '$1,812.59',
        'picture': 'http://placehold.it/32x32',
        'age': 22,
        'eyeColor': 'brown',
        'name': 'Nguyen Bird',
        'gender': 'male',
        'company': 'ISOLOGIA',
        'email': 'nguyenbird@isologia.com',
        'phone': '+1 (895) 572-3299',
        'address': '711 Seagate Terrace, Roland, Maine, 9598',
        'about': 'Proident exercitation laboris occaecat qui id in ut. Ad eiusmod cillum esse laborum ullamco veniam. Labore esse est deserunt non eiusmod eu non sunt. Sint est nostrud in proident consectetur culpa. Deserunt nulla eiusmod Lorem sit commodo pariatur Lorem sint laborum dolore tempor aliqua pariatur.\r\n',
        'registered': '2016-11-10T12:21:25 +06:00',
        'latitude': -17.956863,
        'longitude': -106.199836,
        'tags': [
          'exercitation',
          'sunt',
          'ex',
          'nulla',
          'quis',
          'exercitation',
          'fugiat'
        ],
        'friends': [
          {
            'id': 0,
            'name': 'Levine Mckinney'
          },
          {
            'id': 1,
            'name': 'Clarice Weeks'
          },
          {
            'id': 2,
            'name': 'Johanna Nieves'
          }
        ],
        'greeting': 'Hello, Nguyen Bird! You have 7 unread messages.',
        'favoriteFruit': 'strawberry'
      },
      {
        '_id': '59c1f8c3eeeb8aaea6609301',
        'index': 3,
        'guid': 'cc48cc6d-9254-4803-8856-33a950de80ed',
        'isActive': true,
        'balance': '$2,918.96',
        'picture': 'http://placehold.it/32x32',
        'age': 24,
        'eyeColor': 'brown',
        'name': 'Trujillo Hawkins',
        'gender': 'male',
        'company': 'TOYLETRY',
        'email': 'trujillohawkins@toyletry.com',
        'phone': '+1 (867) 413-3643',
        'address': '576 Nassau Avenue, Selma, Indiana, 4637',
        'about': 'Non incididunt dolore Lorem veniam esse exercitation dolor excepteur labore aute cillum occaecat. Ipsum aliqua mollit nulla mollit eiusmod exercitation aute labore esse esse. Id officia velit dolor id et occaecat sit voluptate do labore pariatur ex quis fugiat. Amet proident mollit ut excepteur ea qui ex laborum ea mollit velit esse. Proident enim Lorem voluptate aliquip sit fugiat deserunt in nostrud duis in id culpa. Minim elit culpa minim eiusmod nulla in tempor veniam laborum dolor ullamco Lorem consequat. Aliqua dolor adipisicing ullamco Lorem excepteur quis irure ipsum.\r\n',
        'registered': '2016-11-30T10:05:52 +06:00',
        'latitude': 23.265707,
        'longitude': 13.38531,
        'tags': [
          'cillum',
          'nisi',
          'Lorem',
          'nulla',
          'cupidatat',
          'commodo',
          'proident'
        ],
        'friends': [
          {
            'id': 0,
            'name': 'Rivas Slater'
          },
          {
            'id': 1,
            'name': 'Amy Donaldson'
          },
          {
            'id': 2,
            'name': 'Gilda Campos'
          }
        ],
        'greeting': 'Hello, Trujillo Hawkins! You have 5 unread messages.',
        'favoriteFruit': 'strawberry'
      },
      {
        '_id': '59c1f8c3f96549e15df4f0b4',
        'index': 4,
        'guid': '38bf39dd-46fd-4b78-a2a2-926e180718b6',
        'isActive': false,
        'balance': '$3,219.06',
        'picture': 'http://placehold.it/32x32',
        'age': 29,
        'eyeColor': 'brown',
        'name': 'Nelson Riley',
        'gender': 'male',
        'company': 'ISOLOGIX',
        'email': 'nelsonriley@isologix.com',
        'phone': '+1 (858) 513-2102',
        'address': '594 Verona Street, Dunlo, Hawaii, 9285',
        'about': 'Incididunt cillum veniam nostrud nulla officia elit consequat exercitation minim proident mollit adipisicing ex in. Lorem et magna exercitation eiusmod cupidatat culpa nostrud ea. Nisi ut culpa qui qui voluptate mollit pariatur proident irure. Cupidatat ullamco in et sit magna voluptate labore commodo id exercitation quis veniam. Mollit commodo ut et sit ipsum sunt. Nostrud occaecat aliquip cillum consequat ut dolor elit deserunt ullamco pariatur.\r\n',
        'registered': '2015-02-28T10:52:15 +06:00',
        'latitude': 15.984293,
        'longitude': -87.765909,
        'tags': [
          'adipisicing',
          'qui',
          'enim',
          'Lorem',
          'laborum',
          'proident',
          'ut'
        ],
        'friends': [
          {
            'id': 0,
            'name': 'Stone Walls'
          },
          {
            'id': 1,
            'name': 'Newman Fuller'
          },
          {
            'id': 2,
            'name': 'Meadows Langley'
          }
        ],
        'greeting': 'Hello, Nelson Riley! You have 9 unread messages.',
        'favoriteFruit': 'apple'
      },
      {
        '_id': '59c1f8c369211e01b7e45d9f',
        'index': 5,
        'guid': 'f46f7c50-210f-4d70-a998-a21fcf81ddc1',
        'isActive': false,
        'balance': '$1,314.47',
        'picture': 'http://placehold.it/32x32',
        'age': 31,
        'eyeColor': 'blue',
        'name': 'Molly Paul',
        'gender': 'female',
        'company': 'BALOOBA',
        'email': 'mollypaul@balooba.com',
        'phone': '+1 (960) 505-2155',
        'address': '936 Foster Avenue, Fairmount, New Mexico, 9954',
        'about': 'Magna eiusmod incididunt adipisicing excepteur elit nostrud tempor. Cillum magna cillum commodo anim. Consectetur nulla exercitation nulla fugiat aliquip mollit in quis esse ea adipisicing cillum non ea. Esse velit nisi exercitation commodo qui voluptate officia ipsum.\r\n',
        'registered': '2014-10-20T04:16:27 +05:00',
        'latitude': -68.107223,
        'longitude': -143.158721,
        'tags': [
          'et',
          'eu',
          'laboris',
          'nisi',
          'ea',
          'dolore',
          'non'
        ],
        'friends': [
          {
            'id': 0,
            'name': 'Luna Albert'
          },
          {
            'id': 1,
            'name': 'Della Holman'
          },
          {
            'id': 2,
            'name': 'Robertson Cash'
          }
        ],
        'greeting': 'Hello, Molly Paul! You have 6 unread messages.',
        'favoriteFruit': 'banana'
      },
      {
        '_id': '59c1f8c33d81f1f4a077eb03',
        'index': 0,
        'guid': '6d62855c-dfe7-4a7b-a512-f01e7325e038',
        'isActive': true,
        'balance': '$3,728.45',
        'picture': 'http://placehold.it/32x32',
        'age': 21,
        'eyeColor': 'blue',
        'name': 'Catherine Blackburn',
        'gender': 'female',
        'company': 'QUIZMO',
        'email': 'catherineblackburn@quizmo.com',
        'phone': '+1 (827) 567-2769',
        'address': '332 Ocean Parkway, Nanafalia, Alabama, 7875',
        'about': 'Sunt Lorem elit adipisicing amet consectetur ullamco culpa irure mollit pariatur minim consectetur veniam irure. Pariatur duis culpa enim tempor. Deserunt reprehenderit dolor id officia mollit proident consectetur non. Consectetur mollit incididunt nisi reprehenderit labore id enim culpa sint laborum ea veniam. Labore ea velit fugiat ad consequat. Minim ad anim amet occaecat cupidatat aliqua nisi sit nulla pariatur.\r\n',
        'registered': '2015-12-24T04:20:51 +06:00',
        'latitude': -62.867646,
        'longitude': 160.566927,
        'tags': [
          'ut',
          'nostrud',
          'enim',
          'reprehenderit',
          'eu',
          'aliquip',
          'et'
        ],
        'friends': [
          {
            'id': 0,
            'name': 'Maggie Frye'
          },
          {
            'id': 1,
            'name': 'Shepherd Carpenter'
          },
          {
            'id': 2,
            'name': 'Jefferson Travis'
          }
        ],
        'greeting': 'Hello, Catherine Blackburn! You have 10 unread messages.',
        'favoriteFruit': 'strawberry'
      },
      {
        '_id': '59c1f8c3b8cf1d7f9d8e6264',
        'index': 1,
        'guid': '2e7bfd3d-eb14-47fd-886b-3c78b8ddda90',
        'isActive': true,
        'balance': '$1,272.57',
        'picture': 'http://placehold.it/32x32',
        'age': 21,
        'eyeColor': 'green',
        'name': 'Murray Rowe',
        'gender': 'male',
        'company': 'MALATHION',
        'email': 'murrayrowe@malathion.com',
        'phone': '+1 (980) 521-2421',
        'address': '557 Cobek Court, Faywood, American Samoa, 8967',
        'about': 'Voluptate eiusmod sunt aute duis aute culpa culpa adipisicing reprehenderit sint nisi consectetur sunt. Reprehenderit sunt reprehenderit ea non eiusmod quis veniam velit fugiat aliqua officia ipsum veniam ullamco. Excepteur anim aliquip sit excepteur proident nulla exercitation. In ex occaecat ea aliquip proident sint culpa sunt elit. Nostrud esse aliqua exercitation in proident enim mollit. Do incididunt irure Lorem occaecat. Aliqua cupidatat eu sit in pariatur pariatur laborum Lorem exercitation deserunt.\r\n',
        'registered': '2014-10-23T07:40:58 +05:00',
        'latitude': 44.632918,
        'longitude': 72.177334,
        'tags': [
          'pariatur',
          'ipsum',
          'sunt',
          'sunt',
          'ipsum',
          'incididunt',
          'elit'
        ],
        'friends': [
          {
            'id': 0,
            'name': 'Gilliam Bond'
          },
          {
            'id': 1,
            'name': 'Amanda Trujillo'
          },
          {
            'id': 2,
            'name': 'Earnestine Skinner'
          }
        ],
        'greeting': 'Hello, Murray Rowe! You have 4 unread messages.',
        'favoriteFruit': 'apple'
      },
      {
        '_id': '59c1f8c3a5eceb26d4805382',
        'index': 2,
        'guid': 'e9c7ad88-de51-41b3-bade-50408a2f3497',
        'isActive': true,
        'balance': '$1,812.59',
        'picture': 'http://placehold.it/32x32',
        'age': 22,
        'eyeColor': 'brown',
        'name': 'Nguyen Bird',
        'gender': 'male',
        'company': 'ISOLOGIA',
        'email': 'nguyenbird@isologia.com',
        'phone': '+1 (895) 572-3299',
        'address': '711 Seagate Terrace, Roland, Maine, 9598',
        'about': 'Proident exercitation laboris occaecat qui id in ut. Ad eiusmod cillum esse laborum ullamco veniam. Labore esse est deserunt non eiusmod eu non sunt. Sint est nostrud in proident consectetur culpa. Deserunt nulla eiusmod Lorem sit commodo pariatur Lorem sint laborum dolore tempor aliqua pariatur.\r\n',
        'registered': '2016-11-10T12:21:25 +06:00',
        'latitude': -17.956863,
        'longitude': -106.199836,
        'tags': [
          'exercitation',
          'sunt',
          'ex',
          'nulla',
          'quis',
          'exercitation',
          'fugiat'
        ],
        'friends': [
          {
            'id': 0,
            'name': 'Levine Mckinney'
          },
          {
            'id': 1,
            'name': 'Clarice Weeks'
          },
          {
            'id': 2,
            'name': 'Johanna Nieves'
          }
        ],
        'greeting': 'Hello, Nguyen Bird! You have 7 unread messages.',
        'favoriteFruit': 'strawberry'
      },
      {
        '_id': '59c1f8c3eeeb8aaea6609301',
        'index': 3,
        'guid': 'cc48cc6d-9254-4803-8856-33a950de80ed',
        'isActive': true,
        'balance': '$2,918.96',
        'picture': 'http://placehold.it/32x32',
        'age': 24,
        'eyeColor': 'brown',
        'name': 'Trujillo Hawkins',
        'gender': 'male',
        'company': 'TOYLETRY',
        'email': 'trujillohawkins@toyletry.com',
        'phone': '+1 (867) 413-3643',
        'address': '576 Nassau Avenue, Selma, Indiana, 4637',
        'about': 'Non incididunt dolore Lorem veniam esse exercitation dolor excepteur labore aute cillum occaecat. Ipsum aliqua mollit nulla mollit eiusmod exercitation aute labore esse esse. Id officia velit dolor id et occaecat sit voluptate do labore pariatur ex quis fugiat. Amet proident mollit ut excepteur ea qui ex laborum ea mollit velit esse. Proident enim Lorem voluptate aliquip sit fugiat deserunt in nostrud duis in id culpa. Minim elit culpa minim eiusmod nulla in tempor veniam laborum dolor ullamco Lorem consequat. Aliqua dolor adipisicing ullamco Lorem excepteur quis irure ipsum.\r\n',
        'registered': '2016-11-30T10:05:52 +06:00',
        'latitude': 23.265707,
        'longitude': 13.38531,
        'tags': [
          'cillum',
          'nisi',
          'Lorem',
          'nulla',
          'cupidatat',
          'commodo',
          'proident'
        ],
        'friends': [
          {
            'id': 0,
            'name': 'Rivas Slater'
          },
          {
            'id': 1,
            'name': 'Amy Donaldson'
          },
          {
            'id': 2,
            'name': 'Gilda Campos'
          }
        ],
        'greeting': 'Hello, Trujillo Hawkins! You have 5 unread messages.',
        'favoriteFruit': 'strawberry'
      },
      {
        '_id': '59c1f8c3f96549e15df4f0b4',
        'index': 4,
        'guid': '38bf39dd-46fd-4b78-a2a2-926e180718b6',
        'isActive': false,
        'balance': '$3,219.06',
        'picture': 'http://placehold.it/32x32',
        'age': 29,
        'eyeColor': 'brown',
        'name': 'Nelson Riley',
        'gender': 'male',
        'company': 'ISOLOGIX',
        'email': 'nelsonriley@isologix.com',
        'phone': '+1 (858) 513-2102',
        'address': '594 Verona Street, Dunlo, Hawaii, 9285',
        'about': 'Incididunt cillum veniam nostrud nulla officia elit consequat exercitation minim proident mollit adipisicing ex in. Lorem et magna exercitation eiusmod cupidatat culpa nostrud ea. Nisi ut culpa qui qui voluptate mollit pariatur proident irure. Cupidatat ullamco in et sit magna voluptate labore commodo id exercitation quis veniam. Mollit commodo ut et sit ipsum sunt. Nostrud occaecat aliquip cillum consequat ut dolor elit deserunt ullamco pariatur.\r\n',
        'registered': '2015-02-28T10:52:15 +06:00',
        'latitude': 15.984293,
        'longitude': -87.765909,
        'tags': [
          'adipisicing',
          'qui',
          'enim',
          'Lorem',
          'laborum',
          'proident',
          'ut'
        ],
        'friends': [
          {
            'id': 0,
            'name': 'Stone Walls'
          },
          {
            'id': 1,
            'name': 'Newman Fuller'
          },
          {
            'id': 2,
            'name': 'Meadows Langley'
          }
        ],
        'greeting': 'Hello, Nelson Riley! You have 9 unread messages.',
        'favoriteFruit': 'apple'
      },
      {
        '_id': '59c1f8c369211e01b7e45d9f',
        'index': 5,
        'guid': 'f46f7c50-210f-4d70-a998-a21fcf81ddc1',
        'isActive': false,
        'balance': '$1,314.47',
        'picture': 'http://placehold.it/32x32',
        'age': 31,
        'eyeColor': 'blue',
        'name': 'Molly Paul',
        'gender': 'female',
        'company': 'BALOOBA',
        'email': 'mollypaul@balooba.com',
        'phone': '+1 (960) 505-2155',
        'address': '936 Foster Avenue, Fairmount, New Mexico, 9954',
        'about': 'Magna eiusmod incididunt adipisicing excepteur elit nostrud tempor. Cillum magna cillum commodo anim. Consectetur nulla exercitation nulla fugiat aliquip mollit in quis esse ea adipisicing cillum non ea. Esse velit nisi exercitation commodo qui voluptate officia ipsum.\r\n',
        'registered': '2014-10-20T04:16:27 +05:00',
        'latitude': -68.107223,
        'longitude': -143.158721,
        'tags': [
          'et',
          'eu',
          'laboris',
          'nisi',
          'ea',
          'dolore',
          'non'
        ],
        'friends': [
          {
            'id': 0,
            'name': 'Luna Albert'
          },
          {
            'id': 1,
            'name': 'Della Holman'
          },
          {
            'id': 2,
            'name': 'Robertson Cash'
          }
        ],
        'greeting': 'Hello, Molly Paul! You have 6 unread messages.',
        'favoriteFruit': 'banana'
      },
      {
        '_id': '59c1f8c33d81f1f4a077eb03',
        'index': 0,
        'guid': '6d62855c-dfe7-4a7b-a512-f01e7325e038',
        'isActive': true,
        'balance': '$3,728.45',
        'picture': 'http://placehold.it/32x32',
        'age': 21,
        'eyeColor': 'blue',
        'name': 'Catherine Blackburn',
        'gender': 'female',
        'company': 'QUIZMO',
        'email': 'catherineblackburn@quizmo.com',
        'phone': '+1 (827) 567-2769',
        'address': '332 Ocean Parkway, Nanafalia, Alabama, 7875',
        'about': 'Sunt Lorem elit adipisicing amet consectetur ullamco culpa irure mollit pariatur minim consectetur veniam irure. Pariatur duis culpa enim tempor. Deserunt reprehenderit dolor id officia mollit proident consectetur non. Consectetur mollit incididunt nisi reprehenderit labore id enim culpa sint laborum ea veniam. Labore ea velit fugiat ad consequat. Minim ad anim amet occaecat cupidatat aliqua nisi sit nulla pariatur.\r\n',
        'registered': '2015-12-24T04:20:51 +06:00',
        'latitude': -62.867646,
        'longitude': 160.566927,
        'tags': [
          'ut',
          'nostrud',
          'enim',
          'reprehenderit',
          'eu',
          'aliquip',
          'et'
        ],
        'friends': [
          {
            'id': 0,
            'name': 'Maggie Frye'
          },
          {
            'id': 1,
            'name': 'Shepherd Carpenter'
          },
          {
            'id': 2,
            'name': 'Jefferson Travis'
          }
        ],
        'greeting': 'Hello, Catherine Blackburn! You have 10 unread messages.',
        'favoriteFruit': 'strawberry'
      },
      {
        '_id': '59c1f8c3b8cf1d7f9d8e6264',
        'index': 1,
        'guid': '2e7bfd3d-eb14-47fd-886b-3c78b8ddda90',
        'isActive': true,
        'balance': '$1,272.57',
        'picture': 'http://placehold.it/32x32',
        'age': 21,
        'eyeColor': 'green',
        'name': 'Murray Rowe',
        'gender': 'male',
        'company': 'MALATHION',
        'email': 'murrayrowe@malathion.com',
        'phone': '+1 (980) 521-2421',
        'address': '557 Cobek Court, Faywood, American Samoa, 8967',
        'about': 'Voluptate eiusmod sunt aute duis aute culpa culpa adipisicing reprehenderit sint nisi consectetur sunt. Reprehenderit sunt reprehenderit ea non eiusmod quis veniam velit fugiat aliqua officia ipsum veniam ullamco. Excepteur anim aliquip sit excepteur proident nulla exercitation. In ex occaecat ea aliquip proident sint culpa sunt elit. Nostrud esse aliqua exercitation in proident enim mollit. Do incididunt irure Lorem occaecat. Aliqua cupidatat eu sit in pariatur pariatur laborum Lorem exercitation deserunt.\r\n',
        'registered': '2014-10-23T07:40:58 +05:00',
        'latitude': 44.632918,
        'longitude': 72.177334,
        'tags': [
          'pariatur',
          'ipsum',
          'sunt',
          'sunt',
          'ipsum',
          'incididunt',
          'elit'
        ],
        'friends': [
          {
            'id': 0,
            'name': 'Gilliam Bond'
          },
          {
            'id': 1,
            'name': 'Amanda Trujillo'
          },
          {
            'id': 2,
            'name': 'Earnestine Skinner'
          }
        ],
        'greeting': 'Hello, Murray Rowe! You have 4 unread messages.',
        'favoriteFruit': 'apple'
      },
      {
        '_id': '59c1f8c3a5eceb26d4805382',
        'index': 2,
        'guid': 'e9c7ad88-de51-41b3-bade-50408a2f3497',
        'isActive': true,
        'balance': '$1,812.59',
        'picture': 'http://placehold.it/32x32',
        'age': 22,
        'eyeColor': 'brown',
        'name': 'Nguyen Bird',
        'gender': 'male',
        'company': 'ISOLOGIA',
        'email': 'nguyenbird@isologia.com',
        'phone': '+1 (895) 572-3299',
        'address': '711 Seagate Terrace, Roland, Maine, 9598',
        'about': 'Proident exercitation laboris occaecat qui id in ut. Ad eiusmod cillum esse laborum ullamco veniam. Labore esse est deserunt non eiusmod eu non sunt. Sint est nostrud in proident consectetur culpa. Deserunt nulla eiusmod Lorem sit commodo pariatur Lorem sint laborum dolore tempor aliqua pariatur.\r\n',
        'registered': '2016-11-10T12:21:25 +06:00',
        'latitude': -17.956863,
        'longitude': -106.199836,
        'tags': [
          'exercitation',
          'sunt',
          'ex',
          'nulla',
          'quis',
          'exercitation',
          'fugiat'
        ],
        'friends': [
          {
            'id': 0,
            'name': 'Levine Mckinney'
          },
          {
            'id': 1,
            'name': 'Clarice Weeks'
          },
          {
            'id': 2,
            'name': 'Johanna Nieves'
          }
        ],
        'greeting': 'Hello, Nguyen Bird! You have 7 unread messages.',
        'favoriteFruit': 'strawberry'
      },
      {
        '_id': '59c1f8c3eeeb8aaea6609301',
        'index': 3,
        'guid': 'cc48cc6d-9254-4803-8856-33a950de80ed',
        'isActive': true,
        'balance': '$2,918.96',
        'picture': 'http://placehold.it/32x32',
        'age': 24,
        'eyeColor': 'brown',
        'name': 'Trujillo Hawkins',
        'gender': 'male',
        'company': 'TOYLETRY',
        'email': 'trujillohawkins@toyletry.com',
        'phone': '+1 (867) 413-3643',
        'address': '576 Nassau Avenue, Selma, Indiana, 4637',
        'about': 'Non incididunt dolore Lorem veniam esse exercitation dolor excepteur labore aute cillum occaecat. Ipsum aliqua mollit nulla mollit eiusmod exercitation aute labore esse esse. Id officia velit dolor id et occaecat sit voluptate do labore pariatur ex quis fugiat. Amet proident mollit ut excepteur ea qui ex laborum ea mollit velit esse. Proident enim Lorem voluptate aliquip sit fugiat deserunt in nostrud duis in id culpa. Minim elit culpa minim eiusmod nulla in tempor veniam laborum dolor ullamco Lorem consequat. Aliqua dolor adipisicing ullamco Lorem excepteur quis irure ipsum.\r\n',
        'registered': '2016-11-30T10:05:52 +06:00',
        'latitude': 23.265707,
        'longitude': 13.38531,
        'tags': [
          'cillum',
          'nisi',
          'Lorem',
          'nulla',
          'cupidatat',
          'commodo',
          'proident'
        ],
        'friends': [
          {
            'id': 0,
            'name': 'Rivas Slater'
          },
          {
            'id': 1,
            'name': 'Amy Donaldson'
          },
          {
            'id': 2,
            'name': 'Gilda Campos'
          }
        ],
        'greeting': 'Hello, Trujillo Hawkins! You have 5 unread messages.',
        'favoriteFruit': 'strawberry'
      },
      {
        '_id': '59c1f8c3f96549e15df4f0b4',
        'index': 4,
        'guid': '38bf39dd-46fd-4b78-a2a2-926e180718b6',
        'isActive': false,
        'balance': '$3,219.06',
        'picture': 'http://placehold.it/32x32',
        'age': 29,
        'eyeColor': 'brown',
        'name': 'Nelson Riley',
        'gender': 'male',
        'company': 'ISOLOGIX',
        'email': 'nelsonriley@isologix.com',
        'phone': '+1 (858) 513-2102',
        'address': '594 Verona Street, Dunlo, Hawaii, 9285',
        'about': 'Incididunt cillum veniam nostrud nulla officia elit consequat exercitation minim proident mollit adipisicing ex in. Lorem et magna exercitation eiusmod cupidatat culpa nostrud ea. Nisi ut culpa qui qui voluptate mollit pariatur proident irure. Cupidatat ullamco in et sit magna voluptate labore commodo id exercitation quis veniam. Mollit commodo ut et sit ipsum sunt. Nostrud occaecat aliquip cillum consequat ut dolor elit deserunt ullamco pariatur.\r\n',
        'registered': '2015-02-28T10:52:15 +06:00',
        'latitude': 15.984293,
        'longitude': -87.765909,
        'tags': [
          'adipisicing',
          'qui',
          'enim',
          'Lorem',
          'laborum',
          'proident',
          'ut'
        ],
        'friends': [
          {
            'id': 0,
            'name': 'Stone Walls'
          },
          {
            'id': 1,
            'name': 'Newman Fuller'
          },
          {
            'id': 2,
            'name': 'Meadows Langley'
          }
        ],
        'greeting': 'Hello, Nelson Riley! You have 9 unread messages.',
        'favoriteFruit': 'apple'
      },
      {
        '_id': '59c1f8c369211e01b7e45d9f',
        'index': 5,
        'guid': 'f46f7c50-210f-4d70-a998-a21fcf81ddc1',
        'isActive': false,
        'balance': '$1,314.47',
        'picture': 'http://placehold.it/32x32',
        'age': 31,
        'eyeColor': 'blue',
        'name': 'Molly Paul',
        'gender': 'female',
        'company': 'BALOOBA',
        'email': 'mollypaul@balooba.com',
        'phone': '+1 (960) 505-2155',
        'address': '936 Foster Avenue, Fairmount, New Mexico, 9954',
        'about': 'Magna eiusmod incididunt adipisicing excepteur elit nostrud tempor. Cillum magna cillum commodo anim. Consectetur nulla exercitation nulla fugiat aliquip mollit in quis esse ea adipisicing cillum non ea. Esse velit nisi exercitation commodo qui voluptate officia ipsum.\r\n',
        'registered': '2014-10-20T04:16:27 +05:00',
        'latitude': -68.107223,
        'longitude': -143.158721,
        'tags': [
          'et',
          'eu',
          'laboris',
          'nisi',
          'ea',
          'dolore',
          'non'
        ],
        'friends': [
          {
            'id': 0,
            'name': 'Luna Albert'
          },
          {
            'id': 1,
            'name': 'Della Holman'
          },
          {
            'id': 2,
            'name': 'Robertson Cash'
          }
        ],
        'greeting': 'Hello, Molly Paul! You have 6 unread messages.',
        'favoriteFruit': 'banana'
      },
      {
        '_id': '59c1f8c33d81f1f4a077eb03',
        'index': 0,
        'guid': '6d62855c-dfe7-4a7b-a512-f01e7325e038',
        'isActive': true,
        'balance': '$3,728.45',
        'picture': 'http://placehold.it/32x32',
        'age': 21,
        'eyeColor': 'blue',
        'name': 'Catherine Blackburn',
        'gender': 'female',
        'company': 'QUIZMO',
        'email': 'catherineblackburn@quizmo.com',
        'phone': '+1 (827) 567-2769',
        'address': '332 Ocean Parkway, Nanafalia, Alabama, 7875',
        'about': 'Sunt Lorem elit adipisicing amet consectetur ullamco culpa irure mollit pariatur minim consectetur veniam irure. Pariatur duis culpa enim tempor. Deserunt reprehenderit dolor id officia mollit proident consectetur non. Consectetur mollit incididunt nisi reprehenderit labore id enim culpa sint laborum ea veniam. Labore ea velit fugiat ad consequat. Minim ad anim amet occaecat cupidatat aliqua nisi sit nulla pariatur.\r\n',
        'registered': '2015-12-24T04:20:51 +06:00',
        'latitude': -62.867646,
        'longitude': 160.566927,
        'tags': [
          'ut',
          'nostrud',
          'enim',
          'reprehenderit',
          'eu',
          'aliquip',
          'et'
        ],
        'friends': [
          {
            'id': 0,
            'name': 'Maggie Frye'
          },
          {
            'id': 1,
            'name': 'Shepherd Carpenter'
          },
          {
            'id': 2,
            'name': 'Jefferson Travis'
          }
        ],
        'greeting': 'Hello, Catherine Blackburn! You have 10 unread messages.',
        'favoriteFruit': 'strawberry'
      },
      {
        '_id': '59c1f8c3b8cf1d7f9d8e6264',
        'index': 1,
        'guid': '2e7bfd3d-eb14-47fd-886b-3c78b8ddda90',
        'isActive': true,
        'balance': '$1,272.57',
        'picture': 'http://placehold.it/32x32',
        'age': 21,
        'eyeColor': 'green',
        'name': 'Murray Rowe',
        'gender': 'male',
        'company': 'MALATHION',
        'email': 'murrayrowe@malathion.com',
        'phone': '+1 (980) 521-2421',
        'address': '557 Cobek Court, Faywood, American Samoa, 8967',
        'about': 'Voluptate eiusmod sunt aute duis aute culpa culpa adipisicing reprehenderit sint nisi consectetur sunt. Reprehenderit sunt reprehenderit ea non eiusmod quis veniam velit fugiat aliqua officia ipsum veniam ullamco. Excepteur anim aliquip sit excepteur proident nulla exercitation. In ex occaecat ea aliquip proident sint culpa sunt elit. Nostrud esse aliqua exercitation in proident enim mollit. Do incididunt irure Lorem occaecat. Aliqua cupidatat eu sit in pariatur pariatur laborum Lorem exercitation deserunt.\r\n',
        'registered': '2014-10-23T07:40:58 +05:00',
        'latitude': 44.632918,
        'longitude': 72.177334,
        'tags': [
          'pariatur',
          'ipsum',
          'sunt',
          'sunt',
          'ipsum',
          'incididunt',
          'elit'
        ],
        'friends': [
          {
            'id': 0,
            'name': 'Gilliam Bond'
          },
          {
            'id': 1,
            'name': 'Amanda Trujillo'
          },
          {
            'id': 2,
            'name': 'Earnestine Skinner'
          }
        ],
        'greeting': 'Hello, Murray Rowe! You have 4 unread messages.',
        'favoriteFruit': 'apple'
      },
      {
        '_id': '59c1f8c3a5eceb26d4805382',
        'index': 2,
        'guid': 'e9c7ad88-de51-41b3-bade-50408a2f3497',
        'isActive': true,
        'balance': '$1,812.59',
        'picture': 'http://placehold.it/32x32',
        'age': 22,
        'eyeColor': 'brown',
        'name': 'Nguyen Bird',
        'gender': 'male',
        'company': 'ISOLOGIA',
        'email': 'nguyenbird@isologia.com',
        'phone': '+1 (895) 572-3299',
        'address': '711 Seagate Terrace, Roland, Maine, 9598',
        'about': 'Proident exercitation laboris occaecat qui id in ut. Ad eiusmod cillum esse laborum ullamco veniam. Labore esse est deserunt non eiusmod eu non sunt. Sint est nostrud in proident consectetur culpa. Deserunt nulla eiusmod Lorem sit commodo pariatur Lorem sint laborum dolore tempor aliqua pariatur.\r\n',
        'registered': '2016-11-10T12:21:25 +06:00',
        'latitude': -17.956863,
        'longitude': -106.199836,
        'tags': [
          'exercitation',
          'sunt',
          'ex',
          'nulla',
          'quis',
          'exercitation',
          'fugiat'
        ],
        'friends': [
          {
            'id': 0,
            'name': 'Levine Mckinney'
          },
          {
            'id': 1,
            'name': 'Clarice Weeks'
          },
          {
            'id': 2,
            'name': 'Johanna Nieves'
          }
        ],
        'greeting': 'Hello, Nguyen Bird! You have 7 unread messages.',
        'favoriteFruit': 'strawberry'
      },
      {
        '_id': '59c1f8c3eeeb8aaea6609301',
        'index': 3,
        'guid': 'cc48cc6d-9254-4803-8856-33a950de80ed',
        'isActive': true,
        'balance': '$2,918.96',
        'picture': 'http://placehold.it/32x32',
        'age': 24,
        'eyeColor': 'brown',
        'name': 'Trujillo Hawkins',
        'gender': 'male',
        'company': 'TOYLETRY',
        'email': 'trujillohawkins@toyletry.com',
        'phone': '+1 (867) 413-3643',
        'address': '576 Nassau Avenue, Selma, Indiana, 4637',
        'about': 'Non incididunt dolore Lorem veniam esse exercitation dolor excepteur labore aute cillum occaecat. Ipsum aliqua mollit nulla mollit eiusmod exercitation aute labore esse esse. Id officia velit dolor id et occaecat sit voluptate do labore pariatur ex quis fugiat. Amet proident mollit ut excepteur ea qui ex laborum ea mollit velit esse. Proident enim Lorem voluptate aliquip sit fugiat deserunt in nostrud duis in id culpa. Minim elit culpa minim eiusmod nulla in tempor veniam laborum dolor ullamco Lorem consequat. Aliqua dolor adipisicing ullamco Lorem excepteur quis irure ipsum.\r\n',
        'registered': '2016-11-30T10:05:52 +06:00',
        'latitude': 23.265707,
        'longitude': 13.38531,
        'tags': [
          'cillum',
          'nisi',
          'Lorem',
          'nulla',
          'cupidatat',
          'commodo',
          'proident'
        ],
        'friends': [
          {
            'id': 0,
            'name': 'Rivas Slater'
          },
          {
            'id': 1,
            'name': 'Amy Donaldson'
          },
          {
            'id': 2,
            'name': 'Gilda Campos'
          }
        ],
        'greeting': 'Hello, Trujillo Hawkins! You have 5 unread messages.',
        'favoriteFruit': 'strawberry'
      },
      {
        '_id': '59c1f8c3f96549e15df4f0b4',
        'index': 4,
        'guid': '38bf39dd-46fd-4b78-a2a2-926e180718b6',
        'isActive': false,
        'balance': '$3,219.06',
        'picture': 'http://placehold.it/32x32',
        'age': 29,
        'eyeColor': 'brown',
        'name': 'Nelson Riley',
        'gender': 'male',
        'company': 'ISOLOGIX',
        'email': 'nelsonriley@isologix.com',
        'phone': '+1 (858) 513-2102',
        'address': '594 Verona Street, Dunlo, Hawaii, 9285',
        'about': 'Incididunt cillum veniam nostrud nulla officia elit consequat exercitation minim proident mollit adipisicing ex in. Lorem et magna exercitation eiusmod cupidatat culpa nostrud ea. Nisi ut culpa qui qui voluptate mollit pariatur proident irure. Cupidatat ullamco in et sit magna voluptate labore commodo id exercitation quis veniam. Mollit commodo ut et sit ipsum sunt. Nostrud occaecat aliquip cillum consequat ut dolor elit deserunt ullamco pariatur.\r\n',
        'registered': '2015-02-28T10:52:15 +06:00',
        'latitude': 15.984293,
        'longitude': -87.765909,
        'tags': [
          'adipisicing',
          'qui',
          'enim',
          'Lorem',
          'laborum',
          'proident',
          'ut'
        ],
        'friends': [
          {
            'id': 0,
            'name': 'Stone Walls'
          },
          {
            'id': 1,
            'name': 'Newman Fuller'
          },
          {
            'id': 2,
            'name': 'Meadows Langley'
          }
        ],
        'greeting': 'Hello, Nelson Riley! You have 9 unread messages.',
        'favoriteFruit': 'apple'
      },
      {
        '_id': '59c1f8c369211e01b7e45d9f',
        'index': 5,
        'guid': 'f46f7c50-210f-4d70-a998-a21fcf81ddc1',
        'isActive': false,
        'balance': '$1,314.47',
        'picture': 'http://placehold.it/32x32',
        'age': 31,
        'eyeColor': 'blue',
        'name': 'Molly Paul',
        'gender': 'female',
        'company': 'BALOOBA',
        'email': 'mollypaul@balooba.com',
        'phone': '+1 (960) 505-2155',
        'address': '936 Foster Avenue, Fairmount, New Mexico, 9954',
        'about': 'Magna eiusmod incididunt adipisicing excepteur elit nostrud tempor. Cillum magna cillum commodo anim. Consectetur nulla exercitation nulla fugiat aliquip mollit in quis esse ea adipisicing cillum non ea. Esse velit nisi exercitation commodo qui voluptate officia ipsum.\r\n',
        'registered': '2014-10-20T04:16:27 +05:00',
        'latitude': -68.107223,
        'longitude': -143.158721,
        'tags': [
          'et',
          'eu',
          'laboris',
          'nisi',
          'ea',
          'dolore',
          'non'
        ],
        'friends': [
          {
            'id': 0,
            'name': 'Luna Albert'
          },
          {
            'id': 1,
            'name': 'Della Holman'
          },
          {
            'id': 2,
            'name': 'Robertson Cash'
          }
        ],
        'greeting': 'Hello, Molly Paul! You have 6 unread messages.',
        'favoriteFruit': 'banana'
      }
    ])
  }
// tslint:disable-next-line:max-file-line-count
}
