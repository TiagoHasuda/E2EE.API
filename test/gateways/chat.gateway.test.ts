import { IChatGateway } from "src/domain/gateways/chat.gateway";
import { ChatGateway } from "src/infra/gateways/chat.gateway";
import { UserRepositoryMock } from "test/mocks/repositories/user.repository.mock";

describe('ChatGateway', () => {
    let userRepository: UserRepositoryMock;

    let sut: IChatGateway;

    const {
        findOneEmailMock,
        findByIdMock,
    } = UserRepositoryMock.getMocks();

    function initDependencies() {
        userRepository = new UserRepositoryMock();
    }

    function initSut() {
        sut = new ChatGateway(userRepository);
    }

    function init() {
        initDependencies();
        initSut();
        jest.clearAllMocks();
    }

    beforeEach(init);

    it('should return false if client doesn\'t have a userId on handleConnection', () => {
        const res = sut.handleConnection({ handshake: { query: {} }, disconnect: () => null } as any);
        return expect(res).toBe(false);
    });

    it('should return false if userId is a string array on handleConnection', () => {
        const res = sut.handleConnection({ handshake: { query: { userId: ['test'] } }, disconnect: () => null } as any);
        return expect(res).toBe(false);
    });

    it('should return true if userId exists and is a string on handleConnection', () => {
        const res = sut.handleConnection({ handshake: { query: { userId: 'test' } }, id: 'test' } as any);
        return expect(res).toBe(true);
    });

    it ('should return true upon completion on handleDisconnect', () => {
        const res = sut.handleDisconnect({ id: 'test' } as any);
        return expect(res).toBe(true);
    });

    it('should return false if no recipient user is found on handleNewMessage', () => {
        findOneEmailMock.mockResolvedValueOnce(null);
        sut.handleConnection({ handshake: { query: { userId: 'test' } }, id: 'test' } as any);
        const promise = sut.handleNewMessage({
            to: '123',
            message: 'message',
            date: new Date(),
        }, { id: 'test' } as any);
        return expect(promise).resolves.toBe(false);
    });

    it('should return false if no sender user is found on handleNewMessage', () => {
        findByIdMock.mockResolvedValueOnce(null);
        sut.handleConnection({ handshake: { query: { userId: 'test' } }, id: 'test' } as any);
        const promise = sut.handleNewMessage({
            to: '123',
            message: 'message',
            date: new Date(),
        }, { id: 'test' } as any);
        return expect(promise).resolves.toBe(false);
    });

    it('should return true if the message is sent successfully on handleNewMessage', () => {
        sut.handleConnection({ handshake: { query: { userId: 'test' } }, id: 'test' } as any);
        const promise = sut.handleNewMessage({
            to: '123',
            message: 'message',
            date: new Date(),
        }, { id: 'test' } as any);
        return expect(promise).resolves.toBe(true);
    });
});
