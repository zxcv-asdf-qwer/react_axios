const PrivacyPolicy: React.FC = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">개인정보 처리방침</h1>
      <p className="mb-4">
        compigs은(는) 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 「개인정보 보호법」 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.
      </p>
      <h2 className="text-2xl font-semibold mt-6 mb-2">1. 회원 가입 및 관리</h2>
      <p className="mb-4">
        회원 가입 의사 확인, 회원제 서비스 제공에 따른 본인 식별・인증, 회원자격 유지・관리, 서비스 부정이용 방지, 만 14세 미만 아동의 개인정보 처리 시 법정대리인의 동의 여부 확인, 각종 고지・통지, 고충처리 목적으로 개인정보를 처리합니다.
      </p>
      <h2 className="text-2xl font-semibold mt-6 mb-2">2. 서비스 제공을 위해 필요 최소한의 범위에서 개인정보를 수집・이용합니다.</h2>
      <h3 className="text-xl font-semibold mt-4 mb-2">정보주체의 동의를 받지 않고 처리하는 개인정보 항목</h3>
      <p className="mb-4">
        compigs은(는) 다음의 개인정보 항목을 정보주체의 동의없이 처리하고 있습니다.
      </p>
      <h4 className="text-lg font-semibold mt-4 mb-2">회원 서비스 운영</h4>
      <ul className="list-disc list-inside mb-4">
        <li>법적 근거: 개인정보 보호법 제15조 제1항 제4호(‘계약 이행’)</li>
        <li>수집・이용 항목: ID, 비밀번호</li>
      </ul>
      <h2 className="text-2xl font-semibold mt-6 mb-2">3. 개인정보의 파기 절차 및 방법</h2>
      <p className="mb-4">
        ① compigs은(는) 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체없이 해당 개인정보를 파기합니다.
      </p>
      <p className="mb-4">
        ② 정보주체로부터 동의받은 개인정보 보유기간이 경과하거나 처리목적이 달성되었음에도 불구하고 다른 법령에 따라 개인정보를 계속 보존하여야 하는 경우에는, 해당 개인정보를 별도의 데이터베이스(DB)로 옮기거나 보관장소를 달리하여 보존합니다.
      </p>
      <p className="mb-4">
        ※ 다른 법령에 따라 보존하는 개인정보의 항목과 보존 근거는 “5. 개인정보의 처리 및 보유기간‘ 항목에서 확인 가능
      </p>
      <p className="mb-4">
        ③ 개인정보 파기의 절차 및 방법은 다음과 같습니다.
      </p>
      <h3 className="text-xl font-semibold mt-4 mb-2">1. 파기절차</h3>
      <p className="mb-4">
        compigs은(는) 파기 사유가 발생한 개인정보를 선정하고, compigs의 개인정보 보호책임자의 승인을 받아 개인정보를 파기합니다.
      </p>
      <h3 className="text-xl font-semibold mt-4 mb-2">2. 파기방법</h3>
      <p className="mb-4">
        compigs은(는) 전자적 파일 형태로 기록・저장된 개인정보는 기록을 재생할 수 없도록 파기하며, 종이 문서에 기록・저장된 개인정보는 분쇄기로 분쇄하거나 소각하여 파기합니다.
      </p>
      <h2 className="text-2xl font-semibold mt-6 mb-2">4. 개인정보의 제3자 제공</h2>
      <p className="mb-4">
        ① compigs은(는) 정보주체의 개인정보를 개인정보의 처리 목적에서 명시한 범위 내에서만 처리하며, 정보주체의 동의, 법률의 특별한 규정 등 「개인정보 보호법」 제17조 및 제18조에 해당하는 경우에만 개인정보를 제3자에게 제공하고 그 이외에는 정보주체의 개인정보를 제3자에게 제공하지 않습니다.
      </p>
      <h2 className="text-2xl font-semibold mt-6 mb-2">5. 개인정보의 안전성 확보조치</h2>
      <p className="mb-4">
        ① compigs은(는) 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다.
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>기술적 조치: 개인정보처리시스템 등의 접근권한 관리, 개인정보의 암호화</li>
        <li>물리적 조치: 자료보관실 등의 접근통제</li>
      </ul>
    </div>
  );
}

export default PrivacyPolicy