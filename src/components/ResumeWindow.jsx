import { useRef, useCallback } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

function ResumeWindow() {
  const contentRef = useRef(null);

  const handleDownloadPDF = useCallback(() => {
    const input = contentRef.current;
    if (!input) return;

    html2canvas(input, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#ffffff',
      onclone: (clonedDoc) => {
        const hr = clonedDoc.querySelector('hr');
        if (hr) {
          hr.style.borderColor = '#d1d5db';
        }
        clonedDoc.body.style.color = 'black';
      },
    })
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        const ratio = canvasWidth / canvasHeight;
        const imgWidth = pdfWidth;
        const imgHeight = imgWidth / ratio;

        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;

        while (heightLeft > 0) {
          position -= pdfHeight;
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pdfHeight;
        }
        pdf.save('myResume.pdf');
      })
      .catch(err => {
        console.error("Erro ao gerar o PDF:", err);
        alert("Ocorreu um erro ao gerar o PDF.");
      });
  }, []);

  return (
    <div className="bg-white font-mono text-xs h-full flex flex-col">
      <div className="bg-gray-200 border-b border-gray-300 px-2 py-0.5 flex items-center text-xs select-none">
        <button className="px-2 py-0.5 hover:bg-blue-500 hover:text-white cursor-pointer" onClick={handleDownloadPDF}>Download</button>
        <span className="px-2 py-0.5 text-gray-500 cursor-default"><u>E</u>dit</span>
        <span className="px-2 py-0.5 text-gray-500 cursor-default"><u>V</u>iew</span>
      </div>
      <div className="p-4 overflow-y-auto flex-1" ref={contentRef}>
        <h2 className="text-base font-bold">Mariana Scarpi</h2>
        <p>
          Email: marianascarpi19@gmail.com<br />
          LinkedIn: linkedin.com/in/mariana-scarpi-461549288/ | GitHub: kinomari
        </p>

        <hr className="my-2 border-gray-300" />

        <h3 className="font-bold mt-2">Summary</h3>
        <p className="mt-1">
          Sou estudante de Análise e Desenvolvimento de Sistemas, em formação como desenvolvedora de software, com foco em desenvolvimento web e construção de aplicações funcionais e
          bem estruturadas.Tenho conhecimentos em Java, JavaScript,
          HTML, CSS e SQL, além de experiência acadêmica com Spring
          Boot, MySQL, MVC, APIs REST e CRUD. Utilizo Git e GitHub
          para versionamento e organização dos projetos, sempre buscando
          boas práticas de código e lógica de programação.Participo
          ativamente de projetos acadêmicos e pessoais, nos quais aplico
          conceitos de programação orientada a objetos, modelagem de
          dados e organização de sistemas. Tenho facilidade em aprender
          novas tecnologias, gosto de resolver problemas e valorizo o
          trabalho em equipe.Busco uma oportunidade de estágio em
          desenvolvimento onde eu possa evoluir tecnicamente, contribuir
          com soluções práticas e crescer junto com a equipe, transformando
          conhecimento em impacto real.
        </p>

        <h3 className="font-bold mt-2">Experience</h3>
        <div className="mt-1">
          <p><strong>Ilustradora Freelancer</strong> (Jun/2017 – Presente)</p>
          <ul className="list-disc ml-5 mt-1">
            <li>Ilustração digital com foco em personagens originais.</li>
          </ul>
        </div>

        <h3 className="font-bold mt-2">Education</h3>
        <p className="mt-1">
          <strong>Análise e Desenvolvimento de Sistemas</strong><br />
          FATEC Baixada Santista Rubens Lara — Santos, SP <br />
          2023 – 2026
        </p>

        <h3 className="font-bold mt-2">Skills</h3>
        <div className="mt-1">
          <p><strong>Front-end:</strong> HTML5, CSS3, JavaScript, React.js, Tailwind CSS, Angular</p>
          <p><strong>Back-end:</strong>  Java, Spring Boot, REST APIs</p>
          <p><strong>Databases:</strong> SQL, MySQL</p>
          <p><strong>Tools:</strong>     Git, Figma</p>
          <p><strong>Methods:</strong>   Scrum</p>
        </div>
      </div>
    </div>
  );
}

export default ResumeWindow;
