import { Button } from 'antd'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import SockJS from 'sockjs-client'
// const Stomp = require('stompjs/lib/stomp').Stomp
import Stomp from 'stompjs'

import { useAppSelector } from '../../../store'
import {
	useLazyGetChatMessagesQuery,
	usePostChatMessageMutation,
	useReadChatMessageMutation
} from '../../../store/api/serviceApi'
import { openChat } from '../../../store/reducers/ChatRespondStatusSlice'
import { setChatId } from '../../../store/reducers/chatIdSlice'
import {
	ChatMessageDateDisplayEnum,
	ChatMessageType
} from '../../../store/reducers/type'
import { AttachIcon } from '../jobSeeker/AttachIcon'

import { ChatMessage } from './ChatMessage'

const seekerToken =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJJQU1pdHJvZmFub3ZAc3R1ZC5rcGZ1LnJ1IiwiaWF0IjoxNzExNTc3OTMwLCJleHAiOjE3MTE1ODg3MzAsInNjb3BlIjoidXNlciIsInJvbGVzIjpbeyJ1c2VySWQiOiIyNTMxNjIiLCJzZXNzaW9uSWQiOiIyNDAzMjI3MTQ4NzUxOTQ4Mjk3MzMwOTA0NzM1MzY2NyIsInNlc3Npb25IYXNoIjoiRDJBMjI1QTc0OTlGMUNFMTZDQkUwMkI5RjZDOTE3RTEiLCJkb2N1bWVudHNIYXNoIjoiQjI2Q0IwQzNFOEFDMzZENkEwQ0I1MTJDRjMwMjM3NzciLCJsb2dpbiI6IklBTWl0cm9mYW5vdiIsInR5cGUiOiJTRUVLRVIifV0sInNlc3Npb25JZCI6IjI0MDMyMjcxNDg3NTE5NDgyOTczMzA5MDQ3MzUzNjY3Iiwic2Vzc2lvbkhhc2giOiJEMkEyMjVBNzQ5OUYxQ0UxNkNCRTAyQjlGNkM5MTdFMSIsImFsbElkIjoiMTc4NDQwIiwiZW1haWwiOiJtaXRyb18wMkBtYWlsLnJ1In0.4dmYBUEDz9UzKxvxWtQhA6poTVwFOkRn-YoSzngfVUs'
const personnelDeparmentToken =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJTdWJCQXNhZHVsbG9ldkBzdHVkLmtwZnUucnUiLCJpYXQiOjE3MTE3MjQ1NDQsImV4cCI6MTcxMTczNTM0NCwic2NvcGUiOiJ1c2VyIiwicm9sZXMiOlt7InVzZXJJZCI6IjciLCJzZXNzaW9uSWQiOiIyNDA0NzM4MTc3NzI3MjIwMTMzMDkwNzU0ODQ2ODU5MSIsInNlc3Npb25IYXNoIjoiNTZEMTZENTNDOTc5MDk5MTk0QTY4OEY4Qjk0M0I0N0MiLCJkb2N1bWVudHNIYXNoIjoiQTdCMkI0MUU4MjQ4NDYzNkY2ODZDNTQ3NEY0NEREMjYiLCJsb2dpbiI6IlNCQXNhZHVsbG9ldiIsInR5cGUiOiJQRVJTT05ORUxfREVQQVJUTUVOVCJ9LHsidXNlcklkIjoiMzQ4NTQxIiwic2Vzc2lvbklkIjoiMjQwNDczODA1NjYxMjc2MDM3NTM5NjI3MjY1MTM0OTQiLCJzZXNzaW9uSGFzaCI6IkUzQUZFMTUzNUVCMTU3NEUyMkZCNUJDNEYxNUFERkUwIiwiZG9jdW1lbnRzSGFzaCI6IiIsImxvZ2luIjoiU3ViQkFzYWR1bGxvZXYiLCJ0eXBlIjoiRU1QTCJ9LHsidXNlcklkIjoiMzM2MDM3Iiwic2Vzc2lvbklkIjoiMjQwNDczODI0NDUwMjI3MTM5NzgzNzQ5OTMwNjk4MDciLCJzZXNzaW9uSGFzaCI6IjcxMEExMTFFM0FCN0Q4NDczNTVFOEM0QkUxMDI4RTZBIiwiZG9jdW1lbnRzSGFzaCI6IkEyMkE3NURCRTBBNzg4MDE4OTY4NjZCQjgzNUIxNDQxIiwibG9naW4iOiJTdUJBc2FkdWxsb2V2IiwidHlwZSI6IlNUVUQifV0sInNlc3Npb25JZCI6IjI0MDQ3MzgxNzc3MjcyMjAxMzMwOTA3NTQ4NDY4NTkxIiwic2Vzc2lvbkhhc2giOiI1NkQxNkQ1M0M5NzkwOTkxOTRBNjg4RjhCOTQzQjQ3QyIsImFsbElkIjoiMjM5MTc0IiwiZW1haWwiOiJCYXN1YmhvbmJla0BnbWFpbC5jb20ifQ.MMK47Gd4AKG8tPzmPAwgNq79zVEmfzdFCuoZjcXeW_o'

type ChatMessageFormDataType = {
	text: string
	files: FileList | null
}

export const ChatPage = () => {
	const chatIdState = useAppSelector(state => state.chatId)
	const ChatStatus = useAppSelector(state => state.chatResponceStatus)
	const user = useAppSelector(state => state.auth.user)
	const isEmpDemp = user?.roles.find(role => role.type === 'EMPL')
	const [getChatMessages, chatMessages] = useLazyGetChatMessagesQuery()
	const [postMsg, postMsgResult] = usePostChatMessageMutation()
	const [readMsg, readMsgResult] = useReadChatMessageMutation()
	const chatPageLowerRef = useRef<null | HTMLDivElement>(null)
	const chatPageUpperRef = useRef<null | HTMLDivElement>(null)
	const chatPageRef = useRef<null | HTMLDivElement>(null)
	const chatPageMessagesRef = useRef<Array<HTMLDivElement | null>>([])

	const [isBottomOfChatVisible, setIsBottomOfChatVisible] =
		useState<boolean>(true)
	const [isTopOfChatVisible, setIsTopOfChatVisible] = useState<boolean>(false)
	const [lastMessageId, setLastMessageId] = useState<number>(0)
	const [initialLoadingFinished, setInitialLoadingFinished] =
		useState<boolean>(false)

	const [scrollPosition, setScrollPosition] = useState<number | undefined>(0)

	const [msgInputText, setMsgInputText] = useState<string>('')
	const msgDate = useRef<string>('')

	const scrollToBottom = () => {
		chatPageLowerRef.current?.scrollIntoView()
		console.log('func scrolling')
	}

	const [messages, setMessages] = useState<ChatMessageType[]>([])

	const [sessionId, setSessionId] = useState<string>('')

	const dispatch = useDispatch()

	useEffect(() => {
		setLastMessageId(0)
	}, [chatIdState])

	useEffect(() => {
		chatPageMessagesRef.current = chatPageMessagesRef.current.slice(
			0,
			messages.length
		)
	}, [messages])

	useEffect(() => {
		console.log(chatPageRef.current?.scrollHeight)
		console.log(scrollPosition)
		console.log(chatPageRef.current?.children[19])
		if (scrollPosition) {
			if (chatPageRef.current) {
				console.log(chatPageRef.current.scrollHeight - scrollPosition)
				document
					.querySelector('body')
					?.scrollTo(0, chatPageRef.current.scrollHeight - scrollPosition)
				// chatPageRef.current.scrollTo(0, 500)
				// chatPageRef.current.children[19].scrollIntoView()
			}
		}
	}, [lastMessageId])

	const keepScrollPosition = (msgCount: number) => {
		console.log(chatPageMessagesRef.current[msgCount - 1])
		// chatPageMessagesRef.current[msgCount - 1]?.scrollIntoView()
	}

	useEffect(() => {
		const socket = new SockJS(
			`http://localhost:8082/employment-api/v1/ws?sender=${
				isEmpDemp ? 'PERSONNEL_DEPARTMENT' : 'SEEKER'
			}&token=Bearer ${isEmpDemp ? personnelDeparmentToken : seekerToken}`
		)
		socket.onopen = () => {
			console.log('WS Open')
		}
		socket.onclose = () => {
			console.log('WS Close')
		}
		const client = Stomp.over(socket)

		client.heartbeat.outgoing = 0
		client.heartbeat.incoming = 0

		client.connect({}, (message: any) => {
			console.log(message.headers['user-name'])
			const sessionId = message.headers['user-name']
			setSessionId(message.headers['user-name'])
			client.subscribe(`/chat/topic/${chatIdState.chatId}`, (message: any) => {
				console.log(message)
				const msgBody = JSON.parse(message.body)
				if (msgBody.type === 'MESSAGE') {
					setMessages(prev => [msgBody.message as ChatMessageType, ...prev])
					readMsg({
						chatId: chatIdState.chatId,
						messageId: msgBody.message.id,
						sessionId: sessionId,
						role: isEmpDemp ? 'PERSONNEL_DEPARTMENT' : 'SEEKER'
					})
				}
				if (msgBody.message.type === 'INVITATION') {
					dispatch(openChat())
				}
				msgBody.type === 'READ' &&
					(msgBody.message.ids as number[]).map(id =>
						setMessages(prev => [
							...prev.map(msg => (msg.id === id ? { ...msg, read: true } : msg))
						])
					)
			})
		})
		return () => {
			client.disconnect(() => {})
			socket.close()
		}
	}, [chatIdState])

	useEffect(() => {
		getChatMessages({
			chatId: chatIdState.chatId,
			size: 20,
			role: isEmpDemp ? 'PERSONNEL_DEPARTMENT' : 'SEEKER'
		})
			.unwrap()
			.then(msg => {
				setMessages(msg)
				if (msg.length !== 0) {
					setLastMessageId(msg[msg.length - 1].id)
					setInitialLoadingFinished(true)
				}
			})
		return () => {
			setInitialLoadingFinished(false)
		}
	}, [chatIdState])

	useEffect(() => {
		console.log('I AM... SCROOOOOOLING')
		if (isBottomOfChatVisible) {
			console.log('Bottom visible from scrolling hook')
			scrollToBottom()
		} else {
			console.log('Bottom invisible from scrolling hook')
		}
	}, [messages.length])

	useEffect(() => {
		const lowerObserver = new IntersectionObserver(entries => {
			const target = entries[0]
			if (target.isIntersecting) {
				console.log('I see the depths of hell below')
				setIsBottomOfChatVisible(true)
			}
			if (!target.isIntersecting) {
				setIsBottomOfChatVisible(false)
			}
		})

		if (chatPageLowerRef.current) {
			lowerObserver.observe(chatPageLowerRef.current)
		}

		return () => {
			if (chatPageLowerRef.current) {
				lowerObserver.unobserve(chatPageLowerRef.current)
			}
		}
	}, [])

	const loadMessagesFromTop = () => {
		console.log(lastMessageId)
		getChatMessages({
			chatId: chatIdState.chatId,
			lastMessageId: lastMessageId,
			size: 20,
			role: isEmpDemp ? 'PERSONNEL_DEPARTMENT' : 'SEEKER'
		})
			.unwrap()
			.then(msg => {
				// setMessages(prev => [...prev, ...msg])
				if (msg.length !== 0) {
					setMessages(prev => [...prev, ...msg])
					setScrollPosition(chatPageRef.current?.scrollHeight)
					keepScrollPosition(msg.length)
					setLastMessageId(msg[msg.length - 1].id)
				}
			})
	}

	useEffect(() => {
		const upperObserver = new IntersectionObserver(entries => {
			const target = entries[0]
			if (target.isIntersecting) {
				console.log("Knocking on heaven's door")
				setIsTopOfChatVisible(true)
			}
			if (!target.isIntersecting) {
				console.log('Gates of heaven are shut for the sinful you')
				setIsTopOfChatVisible(false)
			}
		})

		if (chatPageUpperRef.current) {
			upperObserver.observe(chatPageUpperRef.current)
		}

		return () => {
			if (chatPageUpperRef.current) {
				upperObserver.unobserve(chatPageUpperRef.current)
			}
		}
	}, [])

	useEffect(() => {
		if (isTopOfChatVisible) {
			if (initialLoadingFinished) {
				loadMessagesFromTop()
			}
		}
	}, [isTopOfChatVisible])

	const {
		control,
		handleSubmit,
		register,
		reset,
		formState,
		formState: { isSubmitSuccessful }
	} = useForm({
		defaultValues: { text: '', files: null }
	})

	const handleMessage: SubmitHandler<ChatMessageFormDataType> = data => {
		if (data.files) {
			console.log(data.files)
			const formData = new FormData()
			formData.append('sender', isEmpDemp ? 'PERSONNEL_DEPARTMENT' : 'SEEKER')
			formData.append('text', data.text)
			for (let i = 0; i < data.files.length; i++) {
				formData.append('files', data.files[i])
			}
			fetch(
				`http://localhost:8082/employment-api/v1/chat/${chatIdState.chatId}/file`,
				{
					method: 'POST',
					body: formData,
					headers: {
						Authorization: isEmpDemp
							? `Bearer ${personnelDeparmentToken}`
							: `Bearer ${seekerToken}`,
						'X-User-Name': sessionId
					}
				}
			).then(res => {
				res.json().then(resData => {
					const typedData = resData as ChatMessageType
					setMessages([typedData, ...messages])
					setMsgInputText('')
				})
			})
		} else {
			data.text !== '' &&
				postMsg({
					id: chatIdState.chatId,
					text: data.text,
					name: sessionId,
					role: isEmpDemp ? 'PERSONNEL_DEPARTMENT' : 'SEEKER'
				})
					.unwrap()
					.then(msgData => setMessages([msgData, ...messages]))
			setMsgInputText('')
		}
	}

	useEffect(() => {
		if (formState.isSubmitSuccessful) {
			reset()
			console.log('Success')
		}
	}, [formState])

	console.log('Chat render')

	return (
		<>
			<div className="flex flex-col w-full">
				<div
					ref={chatPageRef}
					className="w-full h-full flex flex-col pt-[60px] pr-[40px] pl-[40px] overflow-scroll"
				>
					<div
						className="h-[1px]"
						key={'verkhnyi_osobyi_kluch'}
						ref={chatPageUpperRef}
					/>
					{[...messages].reverse().map((msg, msgIndex, msgArray) => (
						<>
							{(msg.sendDate.substring(0, 10) !== msgDate.current ||
								msgIndex === 0) &&
								((msgDate.current = msg.sendDate.substring(0, 10)),
								console.log(msg.sendDate.substring(0, 10)),
								(
									<div className="self-center font-content-font font-normal text-black text-[14px]/[16.8px] opacity-60 mt-[60px] mb-[30px]">
										{parseInt(msg.sendDate.substring(8, 10)) +
											' ' +
											ChatMessageDateDisplayEnum[
												parseInt(msg.sendDate.substring(5, 7)) - 1
											]}
									</div>
								))}
							<ChatMessage
								ref={el => (chatPageMessagesRef.current[msgIndex] = el)}
								key={msg.id}
								msgData={msg}
								senderChange={
									msgArray[msgIndex - 1]
										? msgArray[msgIndex - 1].sender !== msg.sender
											? true
											: false
										: false
								}
							/>
						</>
					))}
					{/* <div className="self-start w-[355px] rounded-[16px] rounded-bl-none bg-white p-[20px] flex flex-col font-content-font font-normal text-black text-[16px]/[19.2px]">
						<p className="w-full break-words hyphens-auto">
							АААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААА
						</p>
						<p className="ml-auto font-content-font font-normal text-black text-[12px]/[14.4px] opacity-[52%]">
							14:01
						</p>
					</div> */}
					{ChatStatus.chatClosed && (
						<div className="mt-auto py-[10px] text-center font-content-font font-normal text-[16px]/[16px] text-black text-opacity-40">
							Вы сможете писать в чат после того, как руководитель пригласит вас
							на собеседование
						</div>
					)}
					<div
						className="h-[1px]"
						key={'osobyi_kluch'}
						ref={chatPageLowerRef}
					/>
				</div>
				<div className="sticky bottom-0 h-[80px] w-full bg-white">
					<form
						onSubmit={handleSubmit(handleMessage)}
						className="w-full flex py-[24px] pl-[40px] pr-[85px]"
					>
						<Controller
							name="text"
							control={control}
							render={({ field }) => (
								<textarea
									disabled={ChatStatus.chatClosed}
									{...register('text')}
									value={msgInputText}
									onChange={e => {
										setMsgInputText(e.target.value)
									}}
									className="w-full h-full font-content-font font-normal text-black text-[16px]/[16px] placeholder:opacity-50 resize-none border-none focus:outline-none pt-[8px] disabled:bg-white"
									placeholder="Ввести сообщение"
								></textarea>
							)}
						/>
						<div className="ml-auto flex gap-[8px]">
							<Controller
								name="files"
								control={control}
								render={({ field }) => (
									<>
										<input
											disabled={ChatStatus.chatClosed}
											{...register('files')}
											id="files"
											className="hidden"
											type="file"
											multiple={true}
										></input>
										<label
											htmlFor="files"
											className="self-center cursor-pointer"
										>
											<AttachIcon />
										</label>
									</>
								)}
							/>
							<Button
								disabled={ChatStatus.chatClosed}
								className="rounded-[54.5px] h-[32px] px-[24px]"
								type="primary"
								htmlType="submit"
							>
								Отправить
							</Button>
						</div>
					</form>
				</div>
			</div>
		</>
	)
}
