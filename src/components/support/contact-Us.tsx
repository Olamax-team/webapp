import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Mail, MapPin, Phone } from "lucide-react";

const Contact = () => {
  return (
    <div className="p-4">
      <div className="max-h-screen flex justify-center lg:py-10 lg:px-4 mx-auto h-full">
        <div className="rounded-xl flex justify-center items-center w-full max-w-7xl p-10">
          {/* Left Side */}
          <div className="space-y-6 flex-1">
            <div>
              <h4 className="text-[14px]  lg:text-[18px] font-Inter font-semibold  lg:text-lg  lg:font-bold  text-primary">
                Contact Us
              </h4>
              <h2 className="lg:text-[26px] text-[18px] font-bold font-DMSans mt-2 text-[#121826]">
                Get In Touch With Us
              </h2>
              <p className="mt-4 w-[353px] lg:w-full p-3  text-[#121826] text-[12px] lg:text-[16px] text-center lg:text-left font-Inter font-medium">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim adiqua minim veniam quis nostrud exercitation ullamco.
              </p>
            </div>

            <div className="flex items-start space-x-4">
              <div className="p-3 bg-primary rounded-md">
                <MapPin className="text-white" size={20} />
              </div>
              <div>
                <h4 className="font-medium text-[14px] lg:text-[18px] text-[#121826]">
                  Our Location
                </h4>
                <p className="text-[#121826]">
                  99 St. Jomblo Park Pekanbaru <br /> 28292, Indonesia
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="p-3 bg-primary rounded-md">
                <Phone className="text-white" size={20} />
              </div>
              <div>
                <h4 className="font-medium text-[14px] lg:text-[18px] text-[#121826]">
                  Phone Number
                </h4>
                <a
                  href="https://wa.me/2347074322020"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#121826] hover:underline"
                >
                  +234 707 432 2020
                </a>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="p-3 bg-primary rounded-md">
                <Mail className="text-white" size={20} />
              </div>
              <div>
                <h4 className="font-medium text-[14px] lg:text-[18px] text-[#121826]">
                  Email Address
                </h4>
                <a
                  href="mailto:support@olamax.io"
                  className="text-[#121826] text-[12px] lg:text-[16px] hover:underline"
                >
                  support@olamax.io
                </a>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="relative  mt-10 lg:mt-0 flex-1">
            {/* Pink half-circle */}
            <div className="rounded-lg p-6 space-y-4 ">
              <p className="lg:flex gap-5 ">
                <Input
                  placeholder="Your Name"
                  className="bg-[#f5f5f5] h-[50px] w-full rounded-sm text-[14px] lg:text-[16px]"
                />
                <Input
                  placeholder="Your Email"
                  className="bg-[#f5f5f5] h-[50px]  w-full rounded-sm mt-5 lg:mt-0  text-[14px] lg:text-[16px]"
                />
              </p>
              <Input
                placeholder="Your Phone"
                className="bg-[#f5f5f5] h-[50px] rounded-sm w-full text-[14px] lg:text-[16px] "
              />
              <Textarea
                placeholder="Your Message "
                className="bg-[#f5f5f5] border outline-none focus:outline-none text-[14px] lg:text-[16px] h-[160px] resize-none focus-visible:ring-0 focus-visible:border"
                rows={4}
              />
              <Button
                type="submit"
                onClick={() => {}}
                className="w-full h-[70px]  bg-primary hover:bg-secondary text-[14px] leading-[19.5px] xl:text-[18px] xl:leading-[24px] font-semibold text-white py-2 rounded-lg"
              >
                Send Message
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Contact;
