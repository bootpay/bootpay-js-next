import { isBlank, isPresent, isType } from './common/support'
import { Logger } from './common/logger'
import { Storage } from './storage'
import { setAnalyticsData } from './analytics'

declare global {
    interface Window {
        addBootpayEventListener(event: string, cb: Function, opts?: any): Window

        removeBootpayEventListener(event: string): Window

        resetBootpayEventListener(event: string, cb: Function, opts?: any): void
    }

    interface Document {
        addBootpayEventListener(event: string, cb: Function, opts?: any): Document

        removeBootpayEventListener(event: string): Document

        resetBootpayEventListener(event: string, cb: Function, opts?: any): void
    }

    interface Element {
        addBootpayEventListener(event: string, cb: Function, opts?: any): Element

        removeBootpayEventListener(event: string): Element

        resetBootpayEventListener(event: string, cb: Function, opts?: any): void
    }
}

export interface BootpayEventListener {
    __BOOTPAY_NAMESPACE: any

    initialize(): void

    on(event: string, cb: any, opts?: any): any

    off(event: string): any
}

interface BootpayCommonEventListener {
    catchCommonEvent(): void
}

const generateBootpayEventData = (data: string) => {
    let message: any = {}
    if (isPresent(data) && isType(data, 'string') && /Bootpay/.test(data)) {
        try {
            message = JSON.parse(data)
        } catch (e) {
            Logger.debug(`data: ${data}, ${e.message} JSON 파싱 에러`)
            return message

        }
        return message
    }
}

/**
 * bootpay event controller
 * Comment by Gosomi
 * @date: 2020-10-29
 */
export const EventListener: BootpayEventListener = {
    __BOOTPAY_NAMESPACE: {},
    initialize() {
        if (isPresent(window)) {
            window.addBootpayEventListener = this.on
            window.removeBootpayEventListener = this.off
            window.resetBootpayEventListener = function (event: string, cb: Function, opts?: any) {
                this.removeBootpayEventListener(event).addBootpayEventListener(event, cb, opts)
            }
        }
        if (isPresent(document)) {
            document.addBootpayEventListener = this.on
            document.removeBootpayEventListener = this.off
            document.resetBootpayEventListener = function (event: string, cb: Function, opts?: any) {
                this.removeBootpayEventListener(event).addBootpayEventListener(event, cb, opts)
            }
        }
        if (isPresent(Element)) {
            Element.prototype.addBootpayEventListener = this.on
            Element.prototype.removeBootpayEventListener = this.off
            Element.prototype.resetBootpayEventListener = function (event: string, cb: Function, opts?: any) {
                (this as any).removeBootpayEventListener(event).addBootpayEventListener(event, cb, opts)
            }
        }
    },
    on(event: string, cb: any, opts: any = undefined) {
        if (isBlank(EventListener.__BOOTPAY_NAMESPACE)) {
            EventListener.__BOOTPAY_NAMESPACE = {}
        }
        (this as any).addEventListener(event.split('.')[0], cb, opts || false)
        EventListener.__BOOTPAY_NAMESPACE[event] = cb
        return this
    },
    off(event: string) {
        if (isPresent(EventListener.__BOOTPAY_NAMESPACE) && isPresent(EventListener.__BOOTPAY_NAMESPACE[event])) {
            (this as any).removeEventListener(event.split('.')[0], EventListener.__BOOTPAY_NAMESPACE[event])
        }
        return this
    }
}

/**
 * popup 혹은 기타 다른 통계 정보를 전송 이벤트
 * Comment by Gosomi
 * @date: 2020-10-29
 */
export const BootpayCommonEvent: BootpayCommonEventListener = {
    catchCommonEvent() {
        window.resetBootpayEventListener('message.BootpayCommonEvent', (e: MessageEvent) => {
            const data = generateBootpayEventData(e.data)
            switch (data.action) {
                case 'BootpayAnalyticsData':
                    if (e.source instanceof Window) {
                        e.source.postMessage(JSON.stringify({
                            action: 'BootpayAnalyticsReceived',
                            uuid: Storage.currentUUID(),
                            sk: Storage.sk(),
                            sk_time: Storage.skTime(),
                            time: Storage.time(),
                            user: Storage.user()
                        }), '*')
                    }
                    break
                case 'BootpayAnalyticsReceived':
                    Logger.debug(`receive analytics data from parent: ${JSON.stringify(data)}`)
                    // 통계 정보를 덮어 씌운다
                    setAnalyticsData(data)
            }
        })
    }
}