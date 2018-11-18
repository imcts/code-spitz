/**
 * @Practice #1
 * issued: 소유기반의 코드를 구현하되 강의에 있는 전략함수 대신 전략클래스를 적용하여 개발하라.
 * 전략클래스는 추상층과 구상층을 구분한다.
 *
 * resolved:
 *  - 전략 파싱 객체의 추상 클래스 Parser를 생성한다.
 *  - 전략 객체 ImageParser와 MdParser를 생성하여 Parser를 구현한다.
 *  - loader의 set parser에서는 타입 체크를 하여 Parser를 변경한다.
 *  - loader의 load 메소드가 호출 후 콜백 함수가 호출되기 전까지 다른 파일을 호출하거나, 파서가 변경되면 안되므로
 *    promise를 반환하도록 하고 로드하는 영역을 즉시 실행 함수로 감싸 순차적으로 로드 및 파싱할 수 있도록 구현한다.
 *
 * @Practice #2
 * issued: Loader의 라우팅 테이블을 2단계로 확장하여 다양한 저장소별 매핑이 가능하도록 작성하라.
 *
 * resolved: Practice #1의 구조를 이용하여 확장한다.
 *  - 확장자 상수를 정의한다.
 *  - 깃허브 아이디와 레포지토리 상수를 정의한다.
 *  - Loader클래스의 생성자에서는 repositiory map만 정의한다.
 *  - 전략 파싱 객체인 mdParser와 imageParser를 생성한다.
 *  - 레포지토리를 추가하고 예외처리를 수행하며 레포지토리 map에는 로더와 라우터를 할당한다.
 *  - 각 레포지토리 별 라우터에 확장자별 파서를 추가한다.
 *  - Loader클래스의 load메소드를 호출하면 전달된 인자로 파일을 로드한다.
 *  - 현재는 파서가 파일을 html에 렌더링하는 로직까지 같이 수행하므로 Parser.js에 element setter를 추가하여 변경할 수 있도록 한다.
 *  - 다른 레포지토리에서 데이터를 가져오기 전에 각 파서별로 엘리먼트를 변경한다.
 *  - 엘리먼트를 변경한 후 Loader클래스의 load메소드를 호출하여 두번째 레포지토리의 데이터를 호출 한다.
 */
(async () => {
  const EXTENSIONS_OF_IMAGES = 'jpg,png,gif'
  const EXTENSION_OF_MD = 'md'

  const GITHUB_ID = 'imcts'
  const CODE_SPITZ_REPOSITORY = 'code-spitz'
  const FILES_REPOSITORY = 'files'

  const loader = new Loader()
  const mdParser = new MdParser(document.querySelector('#code-spitz-md'))
  const imageParser = new ImageParser(document.querySelector('#code-spitz-profile'))

  loader.addRepository(CODE_SPITZ_REPOSITORY, GITHUB_ID)
  loader.addRouter(CODE_SPITZ_REPOSITORY, EXTENSIONS_OF_IMAGES, imageParser)
  loader.addRouter(CODE_SPITZ_REPOSITORY, EXTENSION_OF_MD, mdParser)

  loader.addRepository(FILES_REPOSITORY, GITHUB_ID)
  loader.addRouter(FILES_REPOSITORY, EXTENSIONS_OF_IMAGES, imageParser)
  loader.addRouter(FILES_REPOSITORY, EXTENSION_OF_MD, mdParser)

  await loader.load(CODE_SPITZ_REPOSITORY, 'README.md')
  await loader.load(CODE_SPITZ_REPOSITORY, 'profile.png')

  mdParser.element = document.querySelector('#files-md')
  imageParser.element = document.querySelector('#files-profile')
  await loader.load(FILES_REPOSITORY, 'README.md')
  await loader.load(FILES_REPOSITORY, 'image/10211088206.jpg')
})()
