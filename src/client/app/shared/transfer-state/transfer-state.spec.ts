import { ITransferState, TransferState } from './transfer-state'
import { async, TestBed } from '@angular/core/testing'

describe(TransferState.name, () => {
  let service: ITransferState

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        TransferState
      ]
    }).compileComponents()
  }))

  beforeEach(async(() => {
    service = TestBed.get(TransferState)
  }))

  afterEach(async(() => {
    TestBed.resetTestingModule()
  }))

  it('should construct', async(() => {
    expect(service).toBeDefined()
  }))

  it('should return value by key', async(() => {
    service.set('test', 1)
    expect(service.get('test')).toEqual(1)
  }))

  it('should act like a set', async(() => {
    service.set('test', 1)
    expect(service.get('test')).toEqual(1)
    service.set('test', 2)
    expect(service.get('test')).toEqual(2)
    expect(Array.from(service.keys()).length).toBe(1)
  }))

  it('should initialize', async(() => {
    service.initialize({
      value1: 2,
      value2: 4
    })
    expect(service.get('value1')).toEqual(2)
    expect(service.get('value2')).toEqual(4)
    expect(Array.from(service.keys()).length).toBe(2)
  }))

  it('should convert to JSON', async(() => {
    service.initialize({
      value1: 2,
      value2: 4
    })
    expect(service.get('value1')).toEqual(2)
    expect(service.get('value2')).toEqual(4)
    expect(Array.from(service.keys()).length).toBe(2)
    const json = service.toJson()
    expect(json['value1']).toBe(2)
    expect(json['value2']).toBe(4)
  }))

  it('should bust cache', async(() => {
    service.set('test1', 1)
    service.set('test2', 2)
    expect(service.get('test1')).toEqual(1)
    expect(service.get('test2')).toEqual(2)
    service.bust()
    expect(service.get('test1')).not.toBeDefined()
    expect(service.get('test2')).not.toBeDefined()
    expect(Array.from(service.keys()).length).toBe(0)
    expect(service.toJson()).toEqual({})
  }))

  it('should bust a single item from cache by its key', async(() => {
    service.set('test', 1)
    service.set('test2', 2)
    expect(service.get('test')).toEqual(1)
    service.bustByKey('test')
    expect(service.get('test')).not.toBeDefined()
    expect(service.toJson()).toEqual({ test2: 2 })
  }))

  it('should bust cache by key pattern', async(() => {
    const pattern = new RegExp(/SomeThing/)
    service.set('SomeThingq123', 1)
    service.set('123SomeThing', 2)
    service.set('NotRelatedThing', 3)
    expect(service.get('SomeThingq123')).toEqual(1)
    expect(service.get('123SomeThing')).toEqual(2)
    expect(service.get('NotRelatedThing')).toEqual(3)
    service.bustByKeyPattern(pattern)
    expect(service.get('SomeThingq123')).not.toBeDefined()
    expect(service.get('123SomeThing')).not.toBeDefined()
    expect(service.get('NotRelatedThing')).toEqual(3)
    expect(Array.from(service.keys()).length).toBe(1)
  }))
})
