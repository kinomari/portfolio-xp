import Icons from "./Icons";
import myComputerIcon from '../assets/my-computer.png';
import projectsIcon from '../assets/projects.png';
import aboutMeIcon from '../assets/about-me.png';
import myResumeIcon from '../assets/my-resume.png';
import contactMeIcon from '../assets/contact-me.png';

const icons = [
    { name: "My Computer", img: myComputerIcon },
    { name: "Projects.exe", img: projectsIcon },
    { name: "about_me.exe", img: aboutMeIcon },
    { name: "myResume.pdf", img: myResumeIcon },
    { name: "Contact Me", img: contactMeIcon },
];

function Desktop() {
    return (
        <div className="flex flex-col flex-wrap h-full content-start p-2">
            {icons.map((icon) => (
                <Icons key={icon.name} name={icon.name} img={icon.img} />
            ))}
        </div>
    );
}

export default Desktop;
